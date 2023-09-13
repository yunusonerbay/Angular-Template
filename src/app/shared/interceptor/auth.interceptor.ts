import { Router } from '@angular/router';
import { TokenModel } from '../../models/tokenModel';
import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private tokenModel : TokenModel
  date : Date
  toastrService: any;
  constructor(private localStorageService: LocalStorageService, toastrService: ToastrService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    this.tokenModel = this.localStorageService.get("tokenModel");
      this.date = new Date()      
      let tokenExpiration = new Date(this.tokenModel?.expiration)
      if (tokenExpiration < this.date) {
        this.localStorageService.clear();
        this.toastrService.warning("Lütfen Yeniden Giriş Yapınız !", "Oturumunuz Zaman Aşımına Uğradı")
        this.router.navigate(['authentication/login-1']).then(() => { window.location.reload();  });
        return throwError("500")  
      }
      let newRequest : HttpRequest<any>;
      newRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.tokenModel?.token)
      })
      return next.handle(newRequest);
  }
}
