import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil, tap } from 'rxjs/operators';
import { BASE_URL, HttpMethod, PUObject } from 'src/app/models/shared';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PuHttpService extends PUObject {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(path: string, options?: any, method: HttpMethod = HttpMethod.GET): Observable<any> {
    switch (method) {
      case HttpMethod.GET:
        return this.get(this.getUrlParams(path, options));
      case HttpMethod.POST:
        return this.post(path, options);
      case HttpMethod.DELETE:
        return this.delete(this.getUrlParams(path, options));
      default:
        return of([''])
      // TODO: ADD put method 
    }
  }

  private get(path: string) {
    return this.http.get(BASE_URL + path).pipe(takeUntil(this.ngUnsubscribe),
      tap(
        (response: any) => {
          return response.body;
        }, (error: any) => {
          if (error.status == 401) { //TODO: Check what error code to use to kick out the user
            // force logout
          }
        }
      )
    );
  }

  private post(path: string, body: any) {
    return this.http.post(BASE_URL + path, body).pipe(
      tap((response: any) => {
        return response.body;
        // if (response.status === 200 || response.status === 202) {
        //   return of(response.body);
        // }

        // return throwError(new Error(response.message));
      },
        (error: any) => {
          if (error.status == 401) {
            //logout
          }
          return error
        }
      ), takeUntil(this.ngUnsubscribe),
    );
  }

  private delete(path: string) {
    return this.http.delete(BASE_URL + path).pipe(takeUntil(this.ngUnsubscribe),
      tap(
        (response: any) => {
          return response.body;
        }, (error: any) => {
          if (error.status == 401) { //TODO: Check what error code to use to kick out the user
            // force logout
          }
        }
      )
    );
  }

  getUrlParams(path: string, options: any) {
    if (options !== null && options) {
      const queryString = new URLSearchParams(options).toString();
      return path + '?' + queryString;
    }
    return path
  }

}
