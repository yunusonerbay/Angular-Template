import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageClass,
  ToastrMessageType,
  ToastrPosition,
  ToastrTimeOut,
  ToastrTitleClass,
  ToastrToastClass,
} from '../services/ui/custom-toastr.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['authentication/login-1']);
      this.toastrService.message(
        'Devam Edebilmek İçin Sisteme Giriş Yapmalısınız !',
        'Yetkisiz işlem!',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
          timeOut: ToastrTimeOut.fivesn,
          messageClass: ToastrMessageClass.Error,
          titleClass: ToastrTitleClass.Error,
          toastClass: ToastrToastClass.Error,
        }
      );

      return false;
    }
  }
}
