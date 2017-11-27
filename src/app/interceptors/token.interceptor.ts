import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
      const auth = this.inj.get(AuthenticationService);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      return next.handle(request)
    }
}
