import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Balance } from 'src/app/models/response/balanceResponseModel';

@Injectable()
export class CompanyService {
  controllerUrl: string = `${environment.apiUrl}/Company`;

  constructor(private http: HttpClient) {}

  async getBalance(customerId: number) {
    const params = new HttpParams().set('customerId', customerId);
    return this.http
      .get<ItemResponseModel<Balance[]>>(`${this.controllerUrl}/GetBalance`, {
        params,
      })
      .pipe(tap((response) => {}));
  }
}
