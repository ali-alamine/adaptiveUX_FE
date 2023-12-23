import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { PuHttpService } from 'src/app/core/services/singleton/pu-http.service';
import { HttpMethod } from 'src/app/models/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'pu-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  userRegistrationForm!: FormGroup;
  userRoles$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private puHttp: PuHttpService, private router: Router, private fb: FormBuilder) {

    this.getUserRoles().subscribe(
      (data: any) => {
        console.log(data, ">>>>>>>>>>>> DATA <<<<<<<<<<<<<")
      }
    )
  }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      role_id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  fetch(endPoint: string, params: any, method: HttpMethod = HttpMethod.GET): any {
    return this.puHttp.fetch(endPoint, params, method);
  }

  getUserRoles() {
    return this.fetch('get_user_role', {}, HttpMethod.GET).pipe(
      tap(
        (data: any) => {
          this.userRoles$.next(data);
        }
      )
    )
  }

  createUser() {
    this.fetch('signUp', this.userRegistrationForm.value, HttpMethod.POST).subscribe(
      (success: any) => {
        alert('user registered successfully')
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}
