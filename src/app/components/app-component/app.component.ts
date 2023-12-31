import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'pu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pulseCore';
  constructor(public auth: AuthService){
    if (this.auth.getSavedSession() != null) {
      this.auth.isLoggedIn$.next(true);
    }else{
      this.auth.isLoggedIn$.next(false);
    }
  }
}
