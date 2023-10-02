import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { environment } from 'src/environments/environment';
import { RolesToEndpointResponse } from 'src/app/models/response/rolesToEndpointResponseModel';
import { ProcessReport } from 'src/app/models/request/processModel';
import { ProcessResponseReport } from 'src/app/models/response/processResponseModel';

@Injectable()
export class TransactionService {
  controllerUrl: string = `${environment.apiUrl}/Process`;

  constructor(private http: HttpClient) {}

  async getProcess(processReport: ProcessReport) {
    return this.http
      .post<ItemResponseModel<ProcessResponseReport[]>>(
        `${this.controllerUrl}/ListReport`,
        processReport
      )
      .pipe(tap((response) => {}));
  }
}
