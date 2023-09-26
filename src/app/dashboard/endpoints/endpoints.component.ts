import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AssignRoleEndpoint } from 'src/app/models/request/assignRoleEndpointModel';
import { RolesToEndpoint } from 'src/app/models/request/rolesToEndpoint';
import {  Menu } from 'src/app/models/response/menuResponseModel';
import { Role } from 'src/app/models/response/roleResponseModel';
import { RolesToEndpointResponse } from 'src/app/models/response/rolesToEndpointResponseModel';
import { ApplicationsService } from 'src/app/shared/services/applications.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})

export class EndpointsComponent implements OnInit {
  menus : Menu[];
  roles: Role [];
  selecetedRoles: Role [];
  endpointToRoleResponse: RolesToEndpointResponse [];
  endpointToRoleResponseCount: number = 0;
  showContent = false;

  constructor(private applicationsService: ApplicationsService,private roleService: RolesService,private modalService: NzModalService,) {}

   async ngOnInit() {

    let data = await this.applicationsService.getAuthorizeDefinitionEndpoints()
    data.subscribe({
      next: (response) => {
        this.menus = response.data
        console.log(response);
        this.showContent = true;
      },
      error: (e) => { 
        console.log(e);
      },
    });
 
 
  }

  addRole(code:string , menu:string, type:string ){
      console.log(this.roles.filter(x=>x.status));
  }
  

    async showRoles(showRoles: TemplateRef<{}>, code:string , menu:string ,type:string) {
      let rolesToEndpoint: RolesToEndpoint = {
        code:code,
        menu :menu,
      };
      let endpointToRole = await this.applicationsService.getRolesToEndpoint(rolesToEndpoint)
          endpointToRole.subscribe({
            next: async (response) => {
              this.endpointToRoleResponse = response.data
              let roles = await this.roleService.GetRoles()
              roles.subscribe({
                next: (data) => {
                    if(this.endpointToRoleResponse != null){
                      data.data.forEach(x => { 
                        x.status = this.endpointToRoleResponse.some(e => e.roleId == x.id) == true ? true : false
                        this.endpointToRoleResponseCount++;
                      })
                    }
                  this.roles = data.data.filter(x=>x.name.includes("CorporateCompany"))
                }
              });

              const modal = this.modalService.create({
                nzTitle: 'Sayfalara Rol Atama',
                nzContent: showRoles,
                nzFooter: [
                  {
                    label: 'Rolleri Güncelle',
                    type: 'primary',
                    onClick: async () => {

                      let rolersName : string[] = [];
          
                      this.roles.filter(r => r.status).forEach(x=> {
                        rolersName.push(x.name);;
                      })

                      let assignRoleEndpoint: AssignRoleEndpoint = {
                        code:code,
                        menu :menu,
                        type:type,
                        roles:rolersName
                      };

                   ;
                      let assignRoleData = await this.applicationsService.assignRoleEndpoint(assignRoleEndpoint)
                      assignRoleData.subscribe({
                        next: (response) => {
                          
                          console.log(response);
                           },
                        error: (e) => { 
                          console.log(e);
                        },
                      });
                    }
                    },
                ],
                nzWidth: 620
              })
            }
          });
      }
}
