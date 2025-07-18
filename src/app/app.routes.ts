import { Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserGuard } from './user/user.guard';
import { AdminGuard } from './admin/admin.guard';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-failed',
    component: FailedComponent,
  },
];
