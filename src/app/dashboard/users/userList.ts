import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as XLSX from 'xlsx';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/models/response/userResponseModel';
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
import { AssignRoleToUser } from 'src/app/models/request/assignRoleToUserModel';
import { RolesToUser } from 'src/app/models/request/rolesToUserModel';

@Component({
  selector: 'user-list',
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative "
    >
      <div
        class="px-[25px] py-[30px] gap-[15px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
      >
        <button
          class="flex items-center px-[14px] text-sm text-white rounded-md font-semibold bg-primary border-primary h-10 gap-[6px]"
          nz-button
          (click)="showNewContact(newContactContent)"
        >
          <span class="m-0">Export</span>
        </button>
        <ng-template #newContactContent>
          <form nz-form nzLayout="vertical">
            <nz-form-item>
              <nz-form-control>
                <input
                  class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10"
                  type="text"
                  [ngModel]="fileName"
                  (input)="fileName = $event.target.value"
                  nz-input
                  placeholder="File Name"
                  name="fileName"
                />
              </nz-form-control>
            </nz-form-item>
            <nz-form-item class="mb-0">
              <nz-form-control>
                <nz-select
                  class="min-w-[260px] capitalize [&>nz-select-top-control]:border-normal dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[50px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[5px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60"
                  [(ngModel)]="exportFormat"
                  nzPlaceHolder="Select a format"
                  nzAllowClear
                  name="exportFormat"
                >
                  <nz-option nzValue="CSV" nzLabel="CSV"></nz-option>
                  <nz-option nzValue="XLXS" nzLabel="XLXS"></nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </form>
        </ng-template>
        <div
          class="3xl:w-[210px] max-ssm:w-full [&>div>div.ant-select-selector]:border-0"
        >
          <nz-input-group
            class="bg-white dark:bg-white/10 border-regular border-1 dark:border-white/10 rounded-full h-[40px] flex items-center px-[20px]"
          >
            <input
              class="bg-transparent border-none text-[15px] shadow-none text-light dark:text-white/[.87] flex items-center"
              type="text"
              nz-input
              placeholder="Search by User"
              (input)="onSearch($event.target.value)"
            />
            <i
              class="text-light dark:text-white/[.87]"
              nz-icon
              nzType="search"
            ></i>
          </nz-input-group>
        </div>
      </div>
      <div class="px-[25px] pt-0 pb-[25px]">
        <div class="overflow-x-auto">
          <nz-table
            #rowSelectionTable
            nzShowSizeChanger
            [nzData]="listOfCurrentPageData"
            (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
            [nzFrontPagination]="false"
            class="text-sm rounded-[5px] max-xl:whitespace-nowrap"
          >
            <thead>
              <tr>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-[25px] py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-s-[6px] capitalize"
                  [(nzChecked)]="checked"
                  [nzIndeterminate]="indeterminate"
                  (nzCheckedChange)="onAllChecked($event)"
                ></th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Username
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Email
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Phone
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Company
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  Status
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  Add Role
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-[#1b1d2a]">
              <tr class="group" *ngFor="let data of rowSelectionTable.data">
                <td
                  class=" px-[25px] py-2.5 pt-[15px] text-start last:text-end text-dark dark:text-white/[.87] group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[6px]"
                  [nzChecked]="setOfCheckedId.has(data.id)"
                  (nzCheckedChange)="onItemChecked(data.id, $event)"
                ></td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end  text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.userName }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end lowercase text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.email }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end  text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.phoneNumber }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end  text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.company }}
                </td>
                <td
                  class="ps-4 pe-4 py-2.5 font-normal last:text-end  text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[6px]"
                >
                  {{ data.status }}
                </td>
                <td
                  class="ps-4 pe-4 py-2.5 font-normal last:text-end  text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[6px]"
                >
                  <button
                    (click)="showRoles(newShowContent, data.id)"
                    nz-button=""
                    class="ant-btn capitalize bg-dark/10 hover:bg-dark-hbr border-none text-dark hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center gap-1 rounded-[4px] px-[20px] h-[44px]"
                  >
                    <svg
                      class="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="plus-circle"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2Z"
                      ></path>
                    </svg>
                    <span class="ng-star-inserted">Role Ata</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </nz-table>
          <div class="flex items-center justify-end">
            <nz-pagination
              class="mt-3"
              [nzPageIndex]="pageIndex"
              [nzTotal]="listOfData.length"
              [nzPageSize]="pageSize"
              (nzPageIndexChange)="onPageIndexChanged($event)"
            ></nz-pagination>
          </div>
        </div>
      </div>
    </div>

    <div nz-col nzXs="24" nzMd="12">
      <ng-template #newShowContent>
        <form #roleForm="ngForm" nz-form nzLayout="vertical">
          <div class="flex items-center justify-between px-3">
            <span class="text-sm text-black font-medium"
              >Ekli olduğu rol sayısı:</span
            >
            <nz-badge [nzCount]="count()" nzShowZero></nz-badge>
          </div>
          <nz-form-item>
            <nz-form-control>
              <div
                *ngFor="let role of roles; let i = index"
                class="flex items-center justify-between p-4 shadow-md text-black font-medium rounded-4 text-sm"
              >
                <span>{{ role.name }}</span>
                <nz-switch
                  [ngModelOptions]="{ standalone: true }"
                  [(ngModel)]="role.status"
                ></nz-switch>
              </div>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-template>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  pageIndex = 1; // Current page index
  pageSize = 10; // Number of items per page
  listOfCurrentPageData: User[] = []; // Remove 'readonly'
  listOfData: User[] = [];
  setOfCheckedId = new Set<string>();
  fileName: string = '';
  exportFormat: string | undefined;
  fullListOfData: User[] = [];
  searchQuery: string = '';
  roles: Role[] = [];
  userToRoleResponse: string[];

  constructor(
    private modalService: NzModalService,
    private userService: UsersService,
    private applicationsService: ApplicationsService,
    private roleService: RolesService,
    private toastrService: CustomToastrService
  ) {}

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: User[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
  ngOnInit(): void {
    this.loadEmployeeData();
  }

  async loadEmployeeData(): Promise<void> {
    let users = await this.userService.getUsers(7136);
    users.subscribe({
      next: (data) => {
        console.log(data);
        this.fullListOfData = data.data; // Store the full data separately

        // Calculate the start and end index for the current page
        const startIndex = (this.pageIndex - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        // Slice the full data to get the data for the current page
        this.listOfData = this.fullListOfData.slice(startIndex, endIndex);

        this.onSearch(this.searchQuery); // Trigger initial filtering
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // Function to handle the search input change
  onSearch(searchText: string): void {
    this.searchQuery = searchText.trim().toLowerCase();
    if (this.searchQuery) {
      // Filter the data based on the search query
      this.listOfData = this.fullListOfData.filter((employee) =>
        employee.userName.toLowerCase().includes(this.searchQuery)
      );
    } else {
      // If the search query is empty, show the full data
      this.listOfData = this.fullListOfData;
    }
    // Reset the selected checkboxes when the table data changes
    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();
    this.pageIndex = 1; // Reset the page index to 1
    this.onPageIndexChanged(this.pageIndex);
  }

  // Function to handle the page index change
  onPageIndexChanged(index: number): void {
    this.pageIndex = index;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Slice the full data to get the data for the new page
    this.listOfCurrentPageData = this.fullListOfData.slice(
      startIndex,
      endIndex
    );
  }

  // Show the modal to export the selected employees
  showNewContact(newContactContent: TemplateRef<{}>) {
    const selectedEmployees = this.listOfData.filter((employee) =>
      this.setOfCheckedId.has(employee.id)
    );

    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee for export.');
      return;
    }

    // Open the modal
    const modal = this.modalService.create({
      nzTitle: 'Export File',
      nzContent: newContactContent,
      nzFooter: [
        {
          label: 'Export',
          type: 'primary',
          onClick: () => {
            this.exportData(selectedEmployees);
            this.modalService.closeAll();
          },
        },
      ],
      nzWidth: 520,
    });
  }
  // Function to export the selected employees
  exportData(selectedEmployees: User[]) {
    const fileName = this.fileName.trim() || 'exported_data';
    if (this.exportFormat === 'CSV') {
      const csvData = selectedEmployees.map(
        (employee) =>
          `${employee.userName},${employee.email},${employee.company},${employee.phoneNumber},${employee.status}`
      );
      const csvContent = 'data:text/csv;charset=utf-8,' + csvData.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${fileName}.csv`);
      link.click(); // Immediately click the link to trigger the download
    } else if (this.exportFormat === 'XLXS') {
      const worksheet: XLSX.WorkSheet =
        XLSX.utils.json_to_sheet(selectedEmployees);
      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const data: Blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(data);
      link.download = `${fileName}.xlsx`;
      link.click(); // Immediately click the link to trigger the download
    }
  }

  count(): number {
    return this.roles.filter((item) => item.status === true).length;
  }
  async showRoles(showRoles: TemplateRef<{}>, id: string) {
    let rolesToUser: RolesToUser = {
      userId: id,
    };

    let userToRole = await this.applicationsService.getRolesToUser(rolesToUser);
    userToRole.subscribe({
      next: async (response) => {
        this.userToRoleResponse = response.data;
        console.log(response);
        let roles = await this.roleService.GetRoles();
        roles.subscribe({
          next: (data) => {
            if (this.userToRoleResponse != null) {
              data.data.forEach((x) => {
                if (this.userToRoleResponse.some((e) => e == x.name)) {
                  x.status = true;
                } else {
                  x.status = false;
                }
              });
            }
            this.roles = data.data.filter((x) =>
              x.name.includes('CorporateCompany')
            );
            console.log(this.roles);
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

                let assignRoleToUser: AssignRoleToUser = {
                  userId: id,
                  roles: rolersName,
                };

                let assignRoleData =
                  await this.applicationsService.assignRoleUser(
                    assignRoleToUser
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
