import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoginModel } from './../../models/request/loginModel';
@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
      private location: Location,
      private authenticationService : AuthenticationService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('email',this.validateForm);
      console.log('submit', this.validateForm.value);
      console.log('submit', this.validateForm.value.userName);
      console.log('submit', this.validateForm.value.password);

      debugger
      const loginModel: LoginModel = {
        lang : "TR",
        phoneCountry :"TR",
        phoneNumber:"5380559663",
        password :"258258",
        ip:"100.10.10.11",
        deviceId : "B22AA83C-2F55-43B8-A88E-DB56618F0312",
        deviceModel :"string"
      };


      this.authenticationService.login2(loginModel).subscribe(response => {
        console.log(response);
      },responseError => {
          console.log(responseError)
      });


    //   this.router.navigate(['/dashboard/demo-one'])
    //  .then(() => {
    //       window.location.reload();
    //    });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }


  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['hexadash@dm.com', [Validators.required]],
      password: ['123456', [Validators.required]],
      remember: [true],
    });
  }





}
