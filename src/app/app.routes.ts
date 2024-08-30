import { Routes } from '@angular/router';

// Layouts
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// Pages
import {
  HomePageComponent,
  LoginPageComponent,
  UnknownPageComponent,
  CustomerPageComponent,
  PaymentsPageComponent,
} from './pages';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'customers',
        component: CustomerPageComponent,
      },
      {
        path: 'payments',
        component: PaymentsPageComponent,
      },
    ],
  },
  {
    path: '**',
    component: UnknownPageComponent,
  },
];
