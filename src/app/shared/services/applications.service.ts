import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/models/response/menuResponseModel';
import { RolesToEndpointResponse } from 'src/app/models/response/rolesToEndpointResponseModel';
import { RolesToEndpoint } from 'src/app/models/request/rolesToEndpoint';
import { AssignRoleEndpoint } from 'src/app/models/request/assignRoleEndpointModel';
import { ResponseModel } from 'src/app/models/response/responseModel';
import { RolesToUser } from 'src/app/models/request/rolesToUserModel';
import { AssignRoleToUser } from 'src/app/models/request/assignRoleToUserModel';

@Injectable()
export class ApplicationsService {
  controllerUrl: string = `${environment.apiUrl}/Authorization`;

  constructor(private http: HttpClient) {}
  async getAuthorizeDefinitionEndpoints() {
    return this.http
      .get<ItemResponseModel<Menu[]>>(
        `${this.controllerUrl}/GetAuthorizeDefinitionEndpoints`
      )
      .pipe(tap((response) => {}));
  }

  async getRolesToEndpoint(RolesToEndpoint: RolesToEndpoint) {
    return this.http
      .post<ItemResponseModel<RolesToEndpointResponse[]>>(
        `${this.controllerUrl}/GetRolesToEndpoint`,
        RolesToEndpoint
      )
      .pipe(tap((response) => {}));
  }

  async getRolesToUser(RolesToUser: RolesToUser) {
    return this.http
      .post<ItemResponseModel<string[]>>(
        `${this.controllerUrl}/GetRolesToUser`,
        RolesToUser
      )
      .pipe(tap((response) => {}));
  }

  async assignRoleEndpoint(AssignRoleEndpoint: AssignRoleEndpoint) {
    return this.http
      .post<ResponseModel>(
        `${this.controllerUrl}/AssignRoleEndpoint`,
        AssignRoleEndpoint
      )
      .pipe(tap((response) => {}));
  }

  async assignRoleUser(assignRoleToUser: AssignRoleToUser) {
    return this.http
      .post<ResponseModel>(
        `${this.controllerUrl}/AssignRoleToUser`,
        assignRoleToUser
      )
      .pipe(tap((response) => {}));
  }
}
