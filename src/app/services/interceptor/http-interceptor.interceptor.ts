import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private storage:StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.storage.getToken();
    if (token != null) {
      authReq = request.clone({
        headers: request.headers.set("token", token),
      });
    }
    return next.handle(authReq);
  }
}
