// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// ...existing code...
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Import your custom AuthService
import { AuthService } from './auth.service';
import { protectedResources } from './auth-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    // ...existing code...
  ]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Standalone Sample - MSAL Angular';
  isIframe = false;
  loginDisplay = false;
  isUser = false;
  isAdmin = false;
  private readonly _destroying$ = new Subject<void>();
  weatherForecasts: WeatherForecast[] = [];
  apiCallError: string | null = null;

  constructor(
    private authService: AuthService, // Inject your custom AuthService
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log('--- AppComponent ngOnInit called ---');

    this.isIframe = window !== window.parent && !window.opener;

    // Subscribe to AuthService's activeAccount$ to update UI
    this.authService.activeAccount$
      .pipe(takeUntil(this._destroying$))
      .subscribe(account => {
        this.loginDisplay = account !== null;
        const roles = account?.idTokenClaims?.roles || [];
        this.isUser = roles.includes('WeatherUser');
        this.isAdmin = roles.includes('WeatherAdmin');
        console.log('AppComponent: loginDisplay updated based on AuthService:', this.loginDisplay, 'Roles:', roles);
      });
  }

  // --- Login/Logout Methods (delegated to AuthService) ---

  loginPopup(): void {
    this.authService.loginPopup();
  }

  loginRedirect(): void {
    this.authService.loginRedirect();
  }

  logout(): void {
    this.authService.logoutPopup();
  }

  logoutRedirect(): void {
    this.authService.logoutRedirect();
  }

  // --- API Call Methods ---

  privateCallWebApi(url: string): void {
    this.apiCallError = null; // Clear previous errors
    this.weatherForecasts = []; // Clear previous data

    // Make an HTTP GET request to your Web API endpoint
    // The MsalInterceptor will automatically
    // acquire and attach the access token for 'protectedResources.todoListApi.scopes'
    // when a request is made to 'protectedResources.todoListApi.endpoint'.
    this.http.get<WeatherForecast[]>(url)
      .subscribe({
        next: (data) => {
          this.weatherForecasts = data;
          console.log('Weather Forecast Data:', data);
        },
        error: (err) => {
          this.apiCallError = 'Error calling API: ' + (err.message || err.statusText || 'Unknown error');
          console.error('API Call Error:', err);
        }
      });
  }

  callWebApiNoRole(): void {
    this.privateCallWebApi(protectedResources.weatherApi.endpoint);
  }

  callWebApiUser(): void {
    this.privateCallWebApi(protectedResources.weatherApi.endpointUser);
  }

  callWebApiAdmin(): void {
    this.privateCallWebApi(protectedResources.weatherApi.endpointAdmin);
  }

  callWebApiUserAdmin(): void {
    this.privateCallWebApi(protectedResources.weatherApi.endpointUserAdmin);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}