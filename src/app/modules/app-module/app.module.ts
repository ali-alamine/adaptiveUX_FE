import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@components/app-component/app.component'
import { LoginComponent } from '@components/public-components/login/login.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PuCoreModule } from '@modules/pu-core/pu-core.module';
import { PuHttpService } from 'src/app/core/services/singleton/pu-http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CorsInterceptor } from 'src/app/core/services/cors-interceptor';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PuCoreModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    PuHttpService, {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }