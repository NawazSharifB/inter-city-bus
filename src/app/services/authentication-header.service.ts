import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthenticationHeaderService implements HttpInterceptor {

  constructor(
    private injecter: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injecter.get(AuthService);
    const clonedReq = req.clone({
      setHeaders: {
        Authorization:  `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(clonedReq);
  }

}
