import { Router } from '@angular/router';
import { TokenModel } from '../../models/tokenModel';
import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  CustomToastrService,
  ToastrMessageClass,
  ToastrMessageType,
  ToastrPosition,
  ToastrTimeOut,
  ToastrTitleClass,
  ToastrToastClass,
} from '../services/ui/custom-toastr.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenModel: TokenModel;
  private loginTokenModel: TokenModel;
  date: Date;
  constructor(
    private localStorageService: LocalStorageService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.tokenModel = this.localStorageService.get('tokenModel');
    this.loginTokenModel = this.localStorageService.get('loginTokenModel');
    this.date = new Date();
    let tokenExpiration = new Date(this.tokenModel?.expiration);
    if (tokenExpiration < this.date) {
      this.localStorageService.remove('tokenModel');
      this.localStorageService.remove('currentUser');
      this.toastrService.message(
        'Lütfen Yeniden Giriş Yapınız !',
        'Oturumunuz Zaman Aşımına Uğradı',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
          timeOut: ToastrTimeOut.fivesn,
          messageClass: ToastrMessageClass.Warning,
          titleClass: ToastrTitleClass.Warning,
          toastClass: ToastrToastClass.Warning,
        }
      );
      this.router.navigate(['authentication/login-1']);
    }

    let newRequest: HttpRequest<any>;
    var token =
      this.loginTokenModel != null
        ? this.loginTokenModel?.token
        : this.tokenModel?.token;
    newRequest = request.clone({
      // headers: request.headers.set("Authorization", "Bearer " + this.loginTokenModel != null ? this.loginTokenModel?.token : this.tokenModel?.token)
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(newRequest);
  }
}
