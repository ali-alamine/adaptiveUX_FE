import { Component } from '@angular/core';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'pu-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
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
