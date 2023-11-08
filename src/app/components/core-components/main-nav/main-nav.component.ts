import { Component, SkipSelf } from '@angular/core';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'pu-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
  routeItems$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(@SkipSelf() public metadata: MetadataService, @SkipSelf() public auth: AuthService) {

    this.getPrimaryRoutes();
  }

  getPrimaryRoutes() {
    this.metadata.getRoutes().subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          this.routeItems$.next(result);
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
