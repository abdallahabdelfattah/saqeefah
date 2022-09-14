import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // if (request.method === 'POST' && request.url.includes('dashboard/Setting')) {
    //   return next.handle(request);
    // }
    // if (request.method === 'POST' && request.url.includes('dashboard/edit-project')) {
    //   return next.handle(request);
    // }
    // if (request.method === 'POST' && request.url.includes('dashboard/edit-property/')) {
    //   return next.handle(request);
    // }
    // if (request.method === 'GET' && request.url.includes('dashboard/Setting')) {
    //   return next.handle(request);
    // }
    if (request.method === 'DELETE' && request.url.includes('dashboard/Setting/')) {
      return next.handle(request);
    }

    if (request.method === 'POST' ) {
      return next.handle(request);
    }

    this.busyService.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
