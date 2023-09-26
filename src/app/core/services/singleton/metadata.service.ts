import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
import { map } from 'rxjs/internal/operators/map';
import { HttpMethod } from 'src/app/models/shared';
@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private puHttp: PuHttpService) {
  }

  getMenu() {
    return this.puHttp.fetch('get_menu_items').pipe(
      map((menuItems: any) => menuItems.sort((a: any, b: any) => a.order - b.order))
    );
  }

  getFormFields(endPoint: string, params: FormData) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

}