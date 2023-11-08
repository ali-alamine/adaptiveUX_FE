import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'pu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, public auth: AuthService, private fb: FormBuilder) { }
  loginForm!: UntypedFormGroup;

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.auth.validateUser(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
    this.router.navigate(['layout']);
  }
}
