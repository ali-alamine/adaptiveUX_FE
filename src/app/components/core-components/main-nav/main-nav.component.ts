import { Component } from '@angular/core';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'pu-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
<<<<<<< HEAD
  routeItems$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private metadata: MetadataService) {
    this.getCentralRoutes();
  }

  getCentralRoutes() {
    this.metadata.getRoutes().subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          this.routeItems$.next(result);
=======
  menuItems$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private metadata: MetadataService) {
    this.getMenuItems();
  }

  getMenuItems() {
    this.metadata.getMenu().subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          this.menuItems$.next(result);
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
        },
        error: (err: any) => {
          console.log(err)
        },
        complete: () => {
          // console.log('complete')
        }
      }
    );
  }
}
