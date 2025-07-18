import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

export const UserGuard: CanActivateFn = () => {
  const msalService = inject(MsalService);
  const account = msalService.instance.getActiveAccount();
  return account?.idTokenClaims?.roles?.includes('WeatherUser') ?? false;
};
