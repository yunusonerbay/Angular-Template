import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyModel } from 'src/app/models/request/verifyModel';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      verifyCode: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.myForm.valid) {
      const verifyModel: VerifyModel = {
        code: `${this.myForm.value.verifyCode}`,
        methodName: 'verifycode',
        provider: 'E',
        Ip: 'string',
        deviceId: 'string',
        deviceToken: 'string',
      };

      this.authenticationService.verify(verifyModel).subscribe({
        next: (response) => {
          console.log(response);
          this.localStorageService.set(response.data, 'tokenModel');
          this.localStorageService.remove('loginTokenModel');

          this.userService.getUserInfo().subscribe({
            next: () => {
              this.router.navigate(['dashboard/transaction']);
            },
          });
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      Object.values(this.myForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
