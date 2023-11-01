import { Injectable } from '@angular/core';
import { PuHttpService } from '../singleton/pu-http.service';
import { BehaviorSubject } from 'rxjs';
import { HttpMethod } from 'src/app/models/shared';
@Injectable({
  providedIn: 'root'
})

export class DynamicGridService {
  targetedGrid$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private puHttp: PuHttpService) {
  }

<<<<<<< HEAD
  addRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

  filterGridData(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST);
  }

  deleteRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
=======
  filterGridData(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

  deleteRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.DELETE)
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
  }

  pinRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.GET);
  }

  unPinRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.GET);
  }

<<<<<<< HEAD
  fetchFormFieldsValues(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST);
=======
  addRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
  }
}