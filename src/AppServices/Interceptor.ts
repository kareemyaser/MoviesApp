import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmJlY2FiZTc3Y2IwNTg3MTZhM2IxODM1Y2UzZDUwMyIsInN1YiI6IjY1Yjc3NTI5YTBiNjkwMDE3YmNmNDkwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kqvR5Cb5qxYbpBx7faKt1M2xxQ0V5oh2HtWO0eFgEPI`,
      },
    });

    alert('hhhhhh');

    return next.handle(request);
  }
}
