import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageClass, ToastrMessageType, ToastrPosition, ToastrTimeOut, ToastrTitleClass, ToastrToastClass } from './ui/custom-toastr.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: CustomToastrService, private router: Router, private toastr: ToastrService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
            this.toastrService.message(error.error.message, "Yetkisiz işlem!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight,
              timeOut:ToastrTimeOut.fivesn,
              messageClass:ToastrMessageClass.Warning,
              titleClass:ToastrTitleClass.Warning,
              toastClass:ToastrToastClass.Warning
            });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight,
            timeOut:ToastrTimeOut.fivesn,
            messageClass:ToastrMessageClass.Warning,
            titleClass:ToastrTitleClass.Warning,
            toastClass:ToastrToastClass.Warning
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message(error.error.message,"Hata!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight,
            timeOut:ToastrTimeOut.Tensn,
            messageClass:ToastrMessageClass.Warning,
            titleClass:ToastrTitleClass.Warning,
            toastClass:ToastrToastClass.Warning
          });
      
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight,
            timeOut:ToastrTimeOut.fivesn,
            messageClass:ToastrMessageClass.Warning,
            titleClass:ToastrTitleClass.Warning,
            toastClass:ToastrToastClass.Warning
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight,
            timeOut:ToastrTimeOut.fivesn,
            messageClass:ToastrMessageClass.Warning,
            titleClass:ToastrTitleClass.Warning,
            toastClass:ToastrToastClass.Warning
          });
          break;
      }
      return of(error);
    }));
  }
}
