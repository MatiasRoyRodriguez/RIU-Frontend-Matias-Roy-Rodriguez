import { inject, Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService = inject(LoadingService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
