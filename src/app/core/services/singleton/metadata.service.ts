import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
<<<<<<< HEAD
import { map, tap } from 'rxjs/operators';
import { HttpMethod } from 'src/app/models/shared';
import { BehaviorSubject } from 'rxjs';
=======
import { map } from 'rxjs/internal/operators/map';
import { HttpMethod } from 'src/app/models/shared';
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
@Injectable({
  providedIn: 'root'
})
export class MetadataService {
<<<<<<< HEAD
  routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
=======
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e

  constructor(private puHttp: PuHttpService) {
  }

<<<<<<< HEAD
  getRoutes() {
    return this.puHttp.fetch('get_routes').pipe(
      tap((routeItems: any) => this.routes$.next(routeItems))
=======
  getMenu() {
    return this.puHttp.fetch('get_menu_items').pipe(
      map((menuItems: any) => menuItems.sort((a: any, b: any) => a.order - b.order))
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
    );
  }

  getFormFields(endPoint: string, params: FormData) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

}