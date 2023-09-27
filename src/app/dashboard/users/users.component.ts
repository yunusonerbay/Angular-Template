import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AssignRoleToUser } from 'src/app/models/request/assignRoleToUserModel';
import { RolesToUser } from 'src/app/models/request/rolesToUserModel';
import { Role } from 'src/app/models/response/roleResponseModel';
import { RolesToEndpointResponse } from 'src/app/models/response/rolesToEndpointResponseModel';
import { ApplicationsService } from 'src/app/shared/services/applications.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import {
  CustomToastrService,
  ToastrMessageClass,
  ToastrMessageType,
  ToastrPosition,
  ToastrTimeOut,
  ToastrTitleClass,
  ToastrToastClass,
} from 'src/app/shared/services/ui/custom-toastr.service';

@Component({
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  isLoading = true;
  showContent = false;
  roles: Role[];
  userToRoleResponse: RolesToEndpointResponse[];
  constructor(
    private applicationsService: ApplicationsService,
    private roleService: RolesService,
    private modalService: NzModalService,
    private toastrService: CustomToastrService
  ) {}

  ngOnInit() {
    // Simulate loading time
    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
