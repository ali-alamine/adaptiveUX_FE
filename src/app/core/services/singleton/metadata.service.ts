import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
import { map, tap } from 'rxjs/operators';
import { HttpMethod } from 'src/app/models/shared';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private auth: AuthService, private puHttp: PuHttpService) { }

  getRoutes() {
    return this.puHttp.fetch('get_routes').pipe(
      tap((routeItems: any) => this.routes$.next(routeItems))
    );
  }

  getVisitedMenuItemAfterLogin(menuItem: any, interactionType: any) {

    // if (this.auth.isLandingPageNavigationChanged()) {
      const user_id: any = this.auth.user$.getValue()[0].user_id;
      let formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('landing_page', 'Dashboard');
      formData.append('visited_menu_item_id', menuItem.primary_route_id);
      formData.append('interaction_type', interactionType);

      return this.puHttp.fetch('collect_landing_page', formData, HttpMethod.POST).subscribe(
        (success: any) => {
          console.log(success, "success");
          this.auth.setLandingPageNavigation();
        }
      )
    // } else {
    //   return;
    // }
  }

}