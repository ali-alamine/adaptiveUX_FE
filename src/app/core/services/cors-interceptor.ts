import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set the appropriate headers
    const modifiedRequest = request.clone({
      setHeaders: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json, text/plain, */*',
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
