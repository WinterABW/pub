import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LiveResolverService } from './components/live/services/live-resolver.service';
import { ClaveResolverService } from './components/live/services/clave-resolver.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/common/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/full/full.component').then(
        (c) => c.FullComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/incomes',
        pathMatch: 'full',
      } /*{
        path:'dashboard',loadComponent:()=>import('./shared/layout/')
      } , */,
      {
        path: 'incomes',
        loadComponent: () =>
          import('./components/incomes/incomes.component').then(
            (c) => c.IncomesComponent
          ),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('./components/comment/comments/comment.component').then(
            (c) => c.CommentComponent
          ),
      },
      {
        path: 'live',
        loadComponent: () =>
          import('./components/live/live/live.component').then(
            (c) => c.LiveComponent
          ),
        /*  children: [
          {
            path: 'add',
            loadComponent: () =>
              import('./components/live/live-new/live-new.component').then(
                (c) => c.LiveNewComponent
              ),
            resolve: { clave: ClaveResolverService },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./components/live/live-edit/live-edit.component').then(
                (c) => c.LiveEditComponent
              ),
            resolve: { publicacion: LiveResolverService },
          },
        ], */
      },
    ],
  },
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
