import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { LoginModel } from 'src/app/models/request/loginModel';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';

const USER_AUTH_API_URL = '/api-url';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    controllerUrl : string = `https://localhost:44356/api/Auth2`;


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    login2(loginModel:LoginModel){
        return this.http.post<ItemResponseModel<TokenModel>>(`${this.controllerUrl}/login`,loginModel)
        .pipe(map(user => {
            console.log(user);
           
        }));
      }


    login(loginModel : LoginModel) {
        return this.http.post<any>(USER_AUTH_API_URL, loginModel)
        .pipe(map(user => {
            console.log(user);
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}