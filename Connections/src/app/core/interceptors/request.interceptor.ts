import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private localStorage = inject(LocalStorageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorage.getItemToken()}`,
          'rs-uid': `${this.localStorage.getItemUid()}`,
          'rs-email': `${this.localStorage.getItemEmail()}`,
        },
      }),
    );
  }
}
