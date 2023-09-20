import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) { }
  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>) {
    this.toastr[toastrOptions.messageType](message, title, { 
       timeOut: toastrOptions.timeOut,
       positionClass: toastrOptions.position,
       toastClass:toastrOptions.toastClass,
       titleClass:toastrOptions.titleClass,
       messageClass:toastrOptions.messageClass,

      });
  }
}
export class ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;
  timeOut:ToastrTimeOut;
  toastClass:ToastrToastClass;
  messageClass:ToastrMessageClass;
  titleClass:ToastrTitleClass;
}

export enum ToastrTitleClass {
  Success = "toast-title-success",
  Info = "toast-title-info",
  Warning = "toast-title-warning",
  Error = "toast-title-error"
}

export enum ToastrMessageClass {
  Success = "toast-message-success",
  Info = "toast-message-info",
  Warning = "toast-message-warning",
  Error = "toast-message-error"
}

export enum ToastrToastClass {
  Success = "toast-success",
  Info = "toast-info",
  Warning = "toast-warning",
  Error = "toast-error"
}

export enum ToastrMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
export enum ToastrTimeOut {
  fivesn = 5000,
  Tensn = 50000,
}
export enum ToastrPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}