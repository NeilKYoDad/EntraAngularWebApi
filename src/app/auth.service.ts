// src/app/auth.service.ts
import { Injectable, OnDestroy, Inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  AccountInfo,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { PROMPT_MODE } from './auth-config';
import { BehaviorSubject, Subject, lastValueFrom, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Makes this service a singleton
})
export class AuthService implements OnDestroy {
  // Observables for components to subscribe to for authentication state
  private readonly _isAuthenticated = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();

  private readonly _activeAccount = new BehaviorSubject<AccountInfo | null>(null);
  public readonly activeAccount$: Observable<AccountInfo | null> = this._activeAccount.asObservable();



  private readonly _destroying$ = new Subject<void>();

  // --- Constructor ---
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    console.log('AuthService constructor called. Initializing MSAL event handling.');
    this.initMsalEventHandling();
  }

  // --- Public Methods ---

  /**
   * Returns the roles claim from the active account's idTokenClaims, or an empty array if not present.
   */
  public getUserRoles(): string[] {
    const account = this.msalService.instance.getActiveAccount();
    const claims = account?.idTokenClaims as any;
    if (!claims) return [];
    // Azure AD may use 'roles' or 'role' depending on config
    return claims.roles || claims.role || [];
  }

  // --- Private Methods ---

  private initMsalEventHandling(): void {
    // 1. Crucial: Handle MSAL redirects (must be subscribed early in the lifecycle)
    // This processes responses from loginRedirect, acquireTokenRedirect etc.
    this.msalService.handleRedirectObservable()
      .pipe(takeUntil(this._destroying$))
      .subscribe({
        next: (result: AuthenticationResult | null) => {
          if (result && result.account) {
            this.msalService.instance.setActiveAccount(result.account);
            console.log('AuthService: handleRedirectObservable processed, account set:', result.account.username);
          }
        },
        error: (err) => console.error('AuthService: handleRedirectObservable error:', err)
      });

    // 2. Listen for MSAL's inProgress status (most reliable for overall state updates)
    // This ensures internal state is updated after MSAL finishes any operation (initial load, login, acquireToken).
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        console.log('AuthService: inProgress$ emitted None. Updating authentication status.');
        this.updateAuthenticationStatus();
      });

    // 3. Listen for specific MSAL events (e.g., setting active account after explicit success)
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) =>
          msg.eventType === EventType.LOGIN_SUCCESS ||
          msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log(`AuthService: msalSubject$ emitted ${result.eventType} event.`);
        const payload = result.payload as AuthenticationResult;
        if (payload && payload.account) {
          this.msalService.instance.setActiveAccount(payload.account);
          // The inProgress$ listener will call updateAuthenticationStatus after this.
        }
      });

    // 4. Handle logout/account removal redirection
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) =>
          msg.eventType === EventType.ACCOUNT_REMOVED ||
          msg.eventType === EventType.LOGOUT_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        //console.log(`AuthService: msalSubject$ emitted ${result.eventType} event.`);
        // Redirect only if no accounts are left after a logout event
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        }
        // updateAuthenticationStatus will be called via the inProgress$ listener after this
      });

    // 5. Enable account storage events for multi-tab sync (crucial for localStorage)
    // This enables ACCOUNT_ADDED and ACCOUNT_REMOVED events when a user
    // logs in or out of another tab/window, helping sync state across tabs.
    this.msalService.instance.enableAccountStorageEvents();

    // 6. Initial status update on service load.
    // This ensures the service's observables (_isAuthenticated, _activeAccount)
    // reflect the current state immediately when the service is instantiated.
    this.updateAuthenticationStatus();
  }

  // Updates internal BehaviorSubjects based on MSAL's current state
  private updateAuthenticationStatus(): void {
    const allAccounts = this.msalService.instance.getAllAccounts();
    let activeAccount = this.msalService.instance.getActiveAccount();
    console.log('AuthService: updateAuthenticationStatus called. Total accounts:', allAccounts.length, 'Active:', activeAccount?.username);

    // If no active account is set, but accounts exist in localStorage, set the first one as active.
    // This covers page refreshes where an account might be in cache but not yet "active" in the MSAL instance.
    /*
    if (!activeAccount && allAccounts.length > 0) {
      this.msalService.instance.setActiveAccount(allAccounts[0]);
      activeAccount = this.msalService.instance.getActiveAccount(); // Re-get the newly set active account
      console.log('AuthService: Active account re-established from localStorage:', activeAccount?.username);
    }*/

    this._isAuthenticated.next(activeAccount !== null);
    this._activeAccount.next(activeAccount);
  }

  // Helper for common request parameters (scopes, etc.)
  private getBaseAuthRequest<T extends PopupRequest | RedirectRequest>(): T {
    const scopes = ['User.Read']; // TODO duplicated
    return { scopes: scopes } as T;
  }

  // --- Public Login Methods ---

  /**
   * Initiates a login flow using a popup, always forcing account selection.
   * @returns A promise that resolves with the AuthenticationResult.
   */
  async loginPopup(): Promise<AuthenticationResult> {
    console.log('AuthService: loginPopup called: Forcing account selection.');
    const baseRequest = this.getBaseAuthRequest<PopupRequest>();
    const authRequest: PopupRequest = {
      ...baseRequest,
      prompt: PROMPT_MODE, // Use configurable prompt mode
    };

    try {
      const result = await lastValueFrom(this.msalService.loginPopup(authRequest));
      console.log('AuthService: Login Popup successful, response:', result);
      // The updateAuthenticationStatus (via inProgress$ listener) will handle setting the active account.
      return result;
    } catch (error) {
      console.error('AuthService: MSAL Login Popup Error:', error);
      throw error; // Re-throw to propagate error for UI handling
    }
  }

  /**
   * Initiates a login flow using a redirect, always forcing account selection.
   */
  loginRedirect(): void {
    console.log('AuthService: loginRedirect called: Forcing account selection.');
    const baseRequest = this.getBaseAuthRequest<RedirectRequest>();
    const authRequest: RedirectRequest = {
      ...baseRequest,
      prompt: PROMPT_MODE, // Use configurable prompt mode
    };
    this.msalService.loginRedirect(authRequest);
  }

  // --- Public Logout Methods ---

  /**
   * Initiates a logout flow using a popup window. This will log the user out
   * from both the application and their Microsoft account session.
   *
   * It attempts to sign out the currently active account to avoid the account selection popup.
   */
  logoutPopup(): void {
    console.log('AuthService: Logout initiated via logoutPopup.');
    //this._isLoggingOut.next(true); // Indicate logout process is starting

    // Get the currently active account from MSAL's instance
    const activeAccount = this.msalService.instance.getActiveAccount();

    // Pass the active account to logoutPopup
    this.msalService.logoutPopup({
      account: activeAccount || undefined, // Pass the active account, or undefined if none
      mainWindowRedirectUri: '/', // Specifies where the main window should redirect after popup closes
    })
    .subscribe({
      next: () => {
        console.log('AuthService: logoutPopup successfully launched. Waiting for completion events.');
      },
      error: (error) => {
        console.error('AuthService: Error launching logoutPopup:', error);
        //this._isLoggingOut.next(false); // Reset logging out state on error
        //this.forceLocalLogoutState(); // Attempt to force local cleanup on error
      }
    });
  }

  /**
   * Initiates a logout flow using a redirect. This will log the user out
   * from both the application and their Microsoft account session.
   *
   * It attempts to sign out the currently active account to avoid the account selection prompt.
   */
  logoutRedirect(): void {
    console.log('AuthService: Logout initiated via logoutRedirect.');
    const activeAccount = this.msalService.instance.getActiveAccount();
    this.msalService.logoutRedirect({
      account: activeAccount || undefined,
      postLogoutRedirectUri: '/', // Specifies where to redirect after logout
    });
  }

  // ... (rest of your AuthService code including forceLocalLogoutState, ngOnDestroy, etc.) ...


  // --- Cleanup ---
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}