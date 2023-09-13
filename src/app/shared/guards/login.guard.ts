import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class LoginGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private toastrService:ToastrService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authenticationService.isAuthenticated()){
        return true;
      }
      else {
        // this.router.navigate(["/login-1"])
        this.router.navigate(['authentication/login-1']);
        this.toastrService.error("Devam Edebilmek İçin Sisteme Giriş Yapmalısınız !", "Dikkat !") 
        return false;
      }
  }
}
