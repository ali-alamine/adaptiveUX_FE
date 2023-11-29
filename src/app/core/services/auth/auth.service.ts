import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PuHttpService } from 'src/app/core/services/singleton/pu-http.service';
import { HttpMethod } from 'src/app/models/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private puHttp: PuHttpService, private router: Router) {
    this.user$.next(JSON.parse(this.getSavedSession() || '{}'));
  }

  fetchAuth(endPoint: string, params: any): any {
    return this.puHttp.fetch(endPoint, params, HttpMethod.POST)
  }

  saveUserSession(user: any) {
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getSavedSession() {
    return localStorage.getItem('user');
  }

  clearSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('isNavigationChanged');
    this.user$.next(null);
    this.isLoggedIn$.next(false);
  }

  validateUser(user: any) {
    this.clearSession();
    if (this.getSavedSession() == null) {

      return this.fetchAuth('login', user).pipe(
        map((res: any) => {
          if (res.user != null) {
            this.isLoggedIn$.next(true);
            this.saveUserSession(res.user);
          }
          return res;
        })
      )
    }

    return this.getSavedSession();
  }

  setLandingPageNavigation() {
    localStorage.setItem('isNavigationChanged', '1')
  }

  isLandingPageNavigationChanged() {
    console.log(localStorage.getItem('isNavigationChanged'), "localStorage.getItem('isNavigationChanged')");
    return localStorage.getItem('isNavigationChanged') != '1' || localStorage.getItem('isNavigationChanged') == null;
  }

  logout() {
    this.clearSession();
    this.router.navigate(['login']);
  }
}
