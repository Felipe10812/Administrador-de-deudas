import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);  // Inyecta el Router

  const clonetoken = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`
    }
  })
  return next(clonetoken).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        router.navigate(['/login']);
        return throwError(() => new Error('Unauthorized'));
      }
      return throwError(() => e);  // Asegúrate de lanzar el error para manejarlo adecuadamente
    })
  )
};


