import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let token = inject(AuthService).getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
