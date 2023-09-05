import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;

  validateForm!: UntypedFormGroup;

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

      //  this.authenticationService.login(email, password);


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
