import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
import { map, tap } from 'rxjs/operators';
import { HttpMethod } from 'src/app/models/shared';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private puHttp: PuHttpService) {
  }

  getRoutes() {
    return this.puHttp.fetch('get_routes').pipe(
      tap((routeItems: any) => this.routes$.next(routeItems))
    );
  }

  getFormFields(endPoint: string, params: FormData) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

}