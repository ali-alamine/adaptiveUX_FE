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

  addRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

  filterGridData(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST);
  }

  deleteRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

  pinRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.GET);
  }

  unPinRecord(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.GET);
  }

  fetchFormFieldsValues(endPoint: string, params: any) {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST);
  }
}