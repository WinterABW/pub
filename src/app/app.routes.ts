import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/sidenav/sidenav.component').then(
        (c) => c.SidenavComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];
