import { FormioBuilderComponent } from './formio-builder/formio-builder.component';
import { Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserGuard } from './user/user.guard';
import { AdminGuard } from './admin/admin.guard';
import { MsalGuard } from '@azure/msal-angular';
import { FormioDemoComponent } from './formio-demo/formio-demo.component';
import { BootstrapDemoFormComponent } from './bootstrap-demo-form/bootstrap-demo-form.component';
import { NhsstylesheetComponent } from './nhsstylesheet/nhsstylesheet.component';
import { FormioDemoFormComponent } from './formio-demo-form/formio-demo-form.component';

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
    path: 'formio-demo',
    component: FormioDemoComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'bootstrap-demo-form',
    component: BootstrapDemoFormComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'formio-demo-form',
    component: FormioDemoFormComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'login-failed',
    component: FailedComponent,
  },
  {
    path: 'nhs-form',
    component: NhsstylesheetComponent
  },
  {
    path: 'formio-builder',
    component: FormioBuilderComponent
  },
];
