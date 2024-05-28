import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/common/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path:'',
    loadComponent:()=>import('./shared/layout/full/full.component').then(c=>c.FullComponent),
    canActivate:[authGuard],
    children:[
      /* {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },{
        path:'dashboard',loadComponent:()=>import('./shared/layout/')
      } , */
      {
        path: 'incomes',loadComponent: () =>import('./components/incomes/incomes.component').then((c) => c.IncomesComponent),
      },
    ]
  }
 /*  {
    path: '',
    loadComponent: () =>
      import('./shared/components/common/sidenav/sidenav.component').then(
        (c) => c.SidenavComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/sales',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./components/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'incomes',loadChildren: () =>import('./components/incomes/incomes.module').then((m) => m.Incomes),
      },
    ],
  }, */
];
