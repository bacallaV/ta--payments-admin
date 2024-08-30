import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  if (!authToken) return next(req);

  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });

  return next(reqWithHeader);
};
