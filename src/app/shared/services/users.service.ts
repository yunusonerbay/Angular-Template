import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/models/response/menuResponseModel';
import { RolesToEndpointResponse } from 'src/app/models/response/rolesToEndpointResponseModel';
import { RolesToEndpoint } from 'src/app/models/request/rolesToEndpoint';
import { AssignRoleEndpoint } from 'src/app/models/request/assignRoleEndpointModel';
import { ResponseModel } from 'src/app/models/response/responseModel';
import { User } from 'src/app/models/response/userResponseModel';

@Injectable()
export class UsersService {
  controllerUrl: string = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) {}
  async getUsers(companyId: number) {
    const params = new HttpParams().set('customerId', companyId);
    return this.http
      .get<ItemResponseModel<User[]>>(`${this.controllerUrl}/GetUsers`, {
        params,
      })
      .pipe(tap((response) => {}));
  }
}
