import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoginModel } from './../../models/request/loginModel';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;
  validateForm!: FormGroup;
  SignIn:string

  constructor(private fb: FormBuilder,
     private router: Router,
      private location: Location,
      private authenticationService : AuthenticationService,
      private localStorageService:LocalStorageService,
      private languageService :LanguageService,) {}

  submitForm(): void {
    if (this.validateForm.valid) {

      const loginModel: LoginModel = {
        lang : "TR",
        phoneCountry :"TR",
        phoneNumber:"5380559663",
        password :"258258",
        ip:"100.10.10.11",
        deviceId : "B22AA83C-2F55-43B8-A88E-DB56618F0312",
        deviceModel :"string"
      };
      
      debugger;
      this.authenticationService.login(loginModel).subscribe({
        next: (response) => {
          console.log(response);
          this.localStorageService.set(response.data,"loginTokenModel")
          this.router.navigate(['authentication/verify']).then(() => { window.location.reload();  });
        },
        error: (e) => {
          console.log(e);
        },
      });

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
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
    
    // const LanguageModel: LanguageModel={
    //   LanguageCode:"EN",
    //   Key:"SignIn"
    // }
    // this.languageService.Language(LanguageModel).subscribe({
    //     next: (response) => {
    //       debugger
          
    //       console.log("languageServiceResponse = " +response.data);
    //       this.SignIn=response.data;
    //       // this.localStorageService.set(response.data,"tokenModel")
    //       // this.router.navigate(['/dashboard/demo-two']).then(() => { window.location.reload();  });
    //     },
    //     error: (e) => {
    //       console.log(e);
    //     },
    // });
  }





}
