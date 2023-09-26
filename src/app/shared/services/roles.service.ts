import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/models/response/menuResponseModel';
import { Role } from 'src/app/models/response/roleResponseModel';


@Injectable()
export class RolesService {

    controllerUrl : string = `${environment.apiUrl}/Roles`;

    constructor(private http: HttpClient ) {
    
    }
    async GetRoles(){
        return this.http.get<ItemResponseModel<Role[]>>(`${this.controllerUrl}/GetRolesForPage`)
        .pipe(tap((response) => {
          }));
    }


 
}   