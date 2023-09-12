import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class LanguageService {
  
    data: any = {};
  
    constructor(
      private http: HttpClient
    ) { }
  
    use(lang: string): Promise<{}> {
      return new Promise<{}>((resolve, reject) => {
        const langPath = `assets/data/global/language.json`;
  
        this.http.get<{}>(langPath).subscribe(
          translation => {
            // console.log(translation);
            Object.keys(translation).forEach((key) => {
              translation[key] = translation[key][lang];
            });
            this.data = Object.assign({}, translation || {});
            resolve(this.data);
          },
          error => {
            console.log(error);
            this.data = {};
            resolve(this.data);
          }
        );
      });
    }
  
  }

// import { BehaviorSubject, Observable,tap } from 'rxjs';
// // import { map } from 'rxjs/operators';
// import { LanguageModel } from 'src/app/models/request/languageModel';
// import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
// // import { User } from '../interfaces/user.type';
// // import { LoginModel } from 'src/app/models/request/loginModel';
// // import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
// // import { TokenModel } from 'src/app/models/tokenModel';

// const USER_AUTH_API_URL = '/api-url';

// @Injectable()
// export class LanguageService  {
  

//     // Örnek bir işlev, HTML içeriğini değiştirebilir.
  
//     controllerUrl : string = `https://localhost:7068/api/Language`;


//     constructor(private http: HttpClient) {
//         //burada  gelen respons üzerindeki veriyi bir yere yazmak ıstersem buraya eklemem gerek

//         // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//         // this.currentUser = this.currentUserSubject.asObservable();
//     }
 


//     Language(LanguageModel:LanguageModel){
//         return this.http.post<ItemResponseModel<string>>(`${this.controllerUrl}/Language`,LanguageModel)
//         .pipe( tap((response) => {
//             //this.h2Element.nativeElement.textContent = response.data;
            
//             console.log(response);
//           }));
//       }



// }