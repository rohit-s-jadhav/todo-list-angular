import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      request = request.clone({ headers: request.headers.set('Authorization', accessToken) });
    }
    return next.handle(request);
  }
}