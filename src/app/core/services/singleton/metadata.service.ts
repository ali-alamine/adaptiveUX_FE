import { Injectable } from '@angular/core';
import { PuHttpService } from './pu-http.service';
import { tap } from 'rxjs/operators';
import { HttpMethod, getRandomInt, minutesToTimeSpan } from 'src/app/models/shared';
import { BehaviorSubject, of } from 'rxjs';
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
    if (this.auth.getSavedSession() !== null) {
      let formData: any = new FormData();
      formData.append('user_id', this.auth.user$.getValue().user_data[0].user_id)
      return this.puHttp.fetch('get_routes', formData).pipe(
        tap((routeItems: any) => routeItems.sort((a: any, b: any) => a.primary_route_item_order - b.primary_route_item_order)),
        tap((routeItems: any) => this.routes$.next(routeItems))
      );
    } else {
      return of([])
    }

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
    console.log(menuItem,'... menuItem')
    const user: any = this.auth.user$.getValue();
    const user_id: any = user.user_data[0].user_id;
    const session_id: any = user.session_id;
    const time_spent: any = minutesToTimeSpan(getRandomInt(1, 5));

    let formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('session_id', session_id);
    formData.append('current_route_order', menuItem.primary_route_item_order);
    formData.append('visited_route_id', menuItem.primary_route_id);
    formData.append('time_spent_in_milliseconds', time_spent);

    return this.puHttp.fetch('collect_user_nav', formData, HttpMethod.POST).subscribe(
      (success: any) => {
        console.log(success, "success");
        this.auth.setLandingPageNavigation();
      }
    )
  }

}