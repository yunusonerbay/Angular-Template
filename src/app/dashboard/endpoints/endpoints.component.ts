import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AssignRoleEndpoint } from 'src/app/models/request/assignRoleEndpointModel';
import { RolesToEndpoint } from 'src/app/models/request/rolesToEndpoint';
import { Menu } from 'src/app/models/response/menuResponseModel';
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
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
})
export class EndpointsComponent implements OnInit {
  menus: Menu[];
  roles: Role[] = [];
  selecetedRoles: Role[];
  endpointToRoleResponse: RolesToEndpointResponse[];
  showContent = false;

  constructor(
    private applicationsService: ApplicationsService,
    private roleService: RolesService,
    private modalService: NzModalService,
    private toastrService: CustomToastrService
  ) {}

  async ngOnInit() {
    let data = await this.applicationsService.getAuthorizeDefinitionEndpoints();
    data.subscribe({
      next: (response) => {
        this.menus = response.data;
        console.log(response);
        this.showContent = true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  count(): number {
    return this.roles.filter((item) => item.status === true).length;
  }

  async showRoles(showRoles: TemplateRef<{}>, code: string, menu: string) {
    let rolesToEndpoint: RolesToEndpoint = {
      code: code,
      menu: menu,
    };

    let endpointToRole = await this.applicationsService.getRolesToEndpoint(
      rolesToEndpoint
    );
    endpointToRole.subscribe({
      next: async (response) => {
        this.endpointToRoleResponse = response.data;

        let roles = await this.roleService.GetRoles();
        roles.subscribe({
          next: (data) => {
            if (this.endpointToRoleResponse != null) {
              data.data.forEach((x) => {
                if (this.endpointToRoleResponse.some((e) => e.roleId == x.id)) {
                  x.status = true;
                } else {
                  x.status = false;
                }
              });
            }
            this.roles = data.data.filter((x) =>
              x.name.includes('CorporateCompany')
            );
          },
        });

        const modal = this.modalService.create({
          nzTitle: 'Sayfalara Rol Atama',
          nzContent: showRoles,
          nzFooter: [
            {
              label: 'Rolleri Güncelle',
              type: 'primary',
              onClick: async () => {
                let rolersName: string[] = [];
                this.roles
                  .filter((r) => r.status)
                  .forEach((x) => {
                    rolersName.push(x.name);
                  });

                let assignRoleEndpoint: AssignRoleEndpoint = {
                  code: code,
                  menu: menu,
                  roles: rolersName,
                };

                let assignRoleData =
                  await this.applicationsService.assignRoleEndpoint(
                    assignRoleEndpoint
                  );
                assignRoleData.subscribe({
                  next: (response) => {
                    if (response.success) {
                      this.toastrService.message(
                        response.message,
                        'Rol Ekleme',
                        {
                          messageType: ToastrMessageType.Success,
                          position: ToastrPosition.BottomFullWidth,
                          timeOut: ToastrTimeOut.fivesn,
                          messageClass: ToastrMessageClass.Success,
                          titleClass: ToastrTitleClass.Success,
                          toastClass: ToastrToastClass.Success,
                        }
                      );
                      this.modalService.closeAll();
                    }
                  },
                  error: (e) => {
                    console.log(e);
                  },
                });
              },
            },
          ],
          nzWidth: 620,
        });
      },
    });
  }
}
