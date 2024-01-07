import { Component, SkipSelf } from '@angular/core';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'pu-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
  routeItems$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(@SkipSelf() public metadata: MetadataService, @SkipSelf() public auth: AuthService, public router: Router) {

    this.getPrimaryRoutes();
  }

  getPrimaryRoutes() {
    this.metadata.getRoutes().subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          this.routeItems$.next(result);
          console.log(result[0].primary_route_path, '>>>>>>>>>>> result <<<<<<<<<<');
          const landingPage: any = 'layout/' + result[0].primary_route_path;
          console.log(landingPage, '...', landingPage);
          this.router.navigate([landingPage]);
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
