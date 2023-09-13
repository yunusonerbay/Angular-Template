
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyModel } from 'src/app/models/request/verifyModel';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
})

export class VerifyComponent implements OnInit {
  
  myForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService : AuthenticationService,
    private localStorageService:LocalStorageService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      verifyCode: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.myForm.valid) {

        console.log(this.myForm);
        console.log(this.myForm.value.verifyCode);

        const verifyModel: VerifyModel = {
          code: `${this.myForm.value.verifyCode}`,
          ip: "100.10.10.11", 
          methodName: "verifycode",
          provider: "S",
          deviceId: "B22AA83C-2F55-43B8-A88E-DB56618F0312",
          deviceToken :''
        };
  
        this.authenticationService.verify(verifyModel).subscribe({
          next: (response) => {
            console.log(response);
            this.localStorageService.set(response.data,"tokenModel")
            this.router.navigate(['dashboard/demo-two']).then(() => { window.location.reload();  });
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

