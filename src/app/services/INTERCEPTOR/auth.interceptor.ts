import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

// Es un interceptor de HTTP que se encarga de añadir el token de autorización a las peticiones HTTP salientes.
// // Lo hace todo automáticamente, sin necesidad de que el desarrollador lo tenga que hacer manualmente.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');

    let request = req;
    if (token && token.trim() !== '') {
      request = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            return this.authService.refreshToken().pipe(
              switchMap((response) => {
                localStorage.setItem('jwtToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                // Reintentar la solicitud con el nuevo token
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${response.accessToken}` }
                });
                return next.handle(retryReq);
              }),
              catchError(() => {
                return throwError(() => new Error('Sesión expirada, inicia sesión nuevamente.'));
              })
            );
          }
        }
        return throwError(() => error);
      })
    );
  }
}