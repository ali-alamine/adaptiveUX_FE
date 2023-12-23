import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
import { tap } from 'rxjs/operators';
import { HttpMethod } from 'src/app/models/shared';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private auth: AuthService, private puHttp: PuHttpService) { }

  fetchMeta(endPoint: string, params: any, method: HttpMethod = HttpMethod.POST): any {
    return this.puHttp.fetch(endPoint, params, method)
  }

  getRoutes() {
    return this.puHttp.fetch('get_routes').pipe(
      tap((routeItems: any) => this.routes$.next(routeItems))
    );
  }

  submitUserFeedbackStyle(data: any) {
    return this.fetchMeta('update_user_style', data).pipe(
      tap(
        (res: any) => {
          // this.auth.clearSession();
          this.auth.saveUserSession(res.user)
        }
      )
    )
  }

  getVisitedMenuItemAfterLogin(menuItem: any, interactionType: any) {
    console.log(menuItem, '>>>> menuItem')

    // if (this.auth.isLandingPageNavigationChanged()) {
    const user: any = this.auth.user$.getValue();
    const user_id: any = user.user_data[0].user_id;
    const session_id: any = user.session_id;
    let formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('session_id', session_id);
    formData.append('current_route_order', menuItem.primary_route_item_order);
    formData.append('visited_route_id', menuItem.primary_route_id);

    return this.puHttp.fetch('collect_user_nav', formData, HttpMethod.POST).subscribe(
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