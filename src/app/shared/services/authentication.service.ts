import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { LoginModel } from 'src/app/models/request/loginModel';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { VerifyModel } from 'src/app/models/request/verifyModel';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  controllerUrl: string = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginModel: LoginModel) {
    return this.http
      .post<ItemResponseModel<TokenModel>>(
        `${this.controllerUrl}/login`,
        loginModel
      )
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  verify(verifyModel: VerifyModel) {
    return this.http
      .post<ItemResponseModel<TokenModel>>(
        `${this.controllerUrl}/verifycode`,
        verifyModel
      )
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  isAuthenticated() {
    return this.localStorageService.get('tokenModel') ? true : false;
  }

  //   login2(loginModel : LoginModel) {
  //       return this.http.post<any>(USER_AUTH_API_URL, loginModel)
  //       .pipe(map(user => {
  //           console.log(user);
  //           if (user && user.token) {
  //               localStorage.setItem('currentUser', JSON.stringify(user));
  //               this.currentUserSubject.next(user);
  //           }
  //           return user;
  //       }));
  //   }

  // logout() {
  //     localStorage.removeItem('currentUser');
  //     this.currentUserSubject.next(null);
  // }
}
