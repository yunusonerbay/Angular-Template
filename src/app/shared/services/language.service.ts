import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,tap } from 'rxjs';
// import { map } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/request/languageModel';
// import { User } from '../interfaces/user.type';
// import { LoginModel } from 'src/app/models/request/loginModel';
// import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
// import { TokenModel } from 'src/app/models/tokenModel';

const USER_AUTH_API_URL = '/api-url';

@Injectable()
export class AuthenticationService implements OnInit {
   
    controllerUrl : string = `https://localhost:7068/api/Language`;


    constructor(private http: HttpClient) {
        //burada  gelen respons üzerindeki veriyi bir yere yazmak ıstersem buraya eklemem gerek

        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


    Language(LanguageModel:LanguageModel){
        return this.http.post<string>(`${this.controllerUrl}/Language`,LanguageModel)
        .pipe( tap((response) => {
            console.log(response);
          }));
      }



}