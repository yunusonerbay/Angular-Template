import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { environment } from 'src/environments/environment';


@Injectable()
export class ApplicationsService {

    controllerUrl : string = `${environment.apiUrl}/Authorization`;

    constructor(private http: HttpClient ) {
    
    }
    async GetAuthorizeDefinitionEndpoints(){
        return this.http.get<ItemResponseModel<TokenModel>>(`${this.controllerUrl}/GetAuthorizeDefinitionEndpoints`)
        .pipe(tap((response) => {
          }));
    }


 
}