import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  getUserRoutes() {
    return [
      [
        {
          "path": "customer",
          "component": "DynamicContentComponent"
        },
        {
          "path": "customer-profile",
          "component": "CustomerProfileComponent"
        },
        {
          "path": "customer-edit",
          "component": "CustomerEditComponent"
        }
      ]
    ]
  }

}
