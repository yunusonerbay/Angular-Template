import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/response/itemResponseModel';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/response/userResponseModel';
import { UserInfo } from 'src/app/models/response/userInfoModel';

@Injectable()
export class UsersService {
  controllerUrl: string = `${environment.apiUrl}/User`;
  private currentUserSubject: BehaviorSubject<UserInfo>;
  public currentUser: Observable<UserInfo>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInfo>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  async getUsers(companyId: number) {
    const params = new HttpParams().set('customerId', companyId);
    return this.http
      .get<ItemResponseModel<User[]>>(`${this.controllerUrl}/GetUsers`, {
        params,
      })
      .pipe(tap((response) => {}));
  }

  getUserInfo() {
    return this.http
      .get<ItemResponseModel<UserInfo>>(`${this.controllerUrl}/GetUserInfo`)
      .pipe(
        tap((data) => {
          console.log(data);
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          this.currentUserSubject.next(data.data);
          return data;
        })
      );
  }
}
