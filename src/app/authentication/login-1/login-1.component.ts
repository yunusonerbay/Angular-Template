import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoginModel } from './../../models/request/loginModel';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;
  validateForm: FormGroup;
  SignIn:string;
  errorMessage: string;

  constructor(private fb: FormBuilder,
     private router: Router,
      private authenticationService : AuthenticationService,
      private localStorageService:LocalStorageService,
      private languageService :LanguageService,
      private toastrService: ToastrService
      ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const loginModel: LoginModel = {
        email:this.validateForm.value.email,
        password :this.validateForm.value.password,
      };
      this.authenticationService.login(loginModel).subscribe({
        next: (response) => {
          console.log(response);
          this.localStorageService.set(response.data,"loginTokenModel")
          this.router.navigate(['authentication/verify']).then(() => { window.location.reload();  });
        },
        error: (e) => {
          debugger;
          this.toastrService.success('everything is broken', 'Major Error', {
            timeOut: 50000,
            positionClass: 'toast-bottom-right',
          });
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
      email: ['', [Validators.required,Validators.email]],
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
