import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as XLSX from 'xlsx';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { ProcessReport } from 'src/app/models/request/processModel';
import { DatePipe } from '@angular/common';
import { ProcessResponseReport } from 'src/app/models/response/processResponseModel';
interface Employee {
  id: number;
  name: string;
  email: string;
  company: string;
  position: string;
  joinDate: string;
  selected: boolean;
}

@Component({
  selector: 'transaction-list',
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative "
    >
      <div
        class="px-[25px] py-[30px] gap-[15px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
      >
        <div class="flex items-center justify-center gap-4">
          <nz-form-label
            class="flex items-center font-normal capitalize dark:text-white/60"
            nzLg="6"
            nzMd="9"
            nzXs="24"
            nzFor="datePicker"
            >Tarih Seçiniz</nz-form-label
          >
          <nz-form-control>
            <nz-range-picker
              class="inline-flex items-center rounden border-normal border-1 text-[14px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[50px] outline-none placeholder:text-light placeholder:font-normal text-theme-gray dark:text-white/60 w-[200px]"
              nzFormat="yyyy-MM-dd"
              ngModel
              (ngModelChange)="onChange($event)"
            ></nz-range-picker>
          </nz-form-control>
        </div>

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
        <div class="flex items-center justify-center gap-4">
          <div class="inline-flex items-center">
            <span class="ltr:mr-2 rtl:ml-2 dark:text-white/60">Status:</span>
            <nz-select
              class="min-w-[180px] capitalize [&>nz-select-top-control]:border-normal dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[40px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[6px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-light dark:[&>.ant-select-arrow]:text-white/60"
              [(ngModel)]="statusFilter"
              (ngModelChange)="filterByStatus()"
            >
              <nz-option nzValue="all" nzLabel="Hepsi"></nz-option>
              <nz-option nzValue="başarılı" nzLabel="Başarılı"></nz-option>
              <nz-option nzValue="iptal" nzLabel="İptal"></nz-option>
              <nz-option nzValue="beklemede" nzLabel="Beklemede"></nz-option>
            </nz-select>
          </div>
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
                placeholder="Search CustomerName"
                (input)="onSearch($event.target.value)"
              />
              <i
                class="text-light dark:text-white/[.87]"
                nz-icon
                nzType="search"
              ></i>
            </nz-input-group>
          </div>
          <button
            class="flex items-center px-[14px] text-sm text-white rounded-md font-semibold bg-primary border-primary h-10 gap-[6px]"
            nz-button
            (click)="showNewContact(newContactContent)"
          >
            <span class="m-0">Export</span>
          </button>
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
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  type
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  processType
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  customerId
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  customerName
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  walletId
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  senderWalletNo
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  currencyId
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  currency
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  value
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  fee
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  total
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  defRate
                </th> -->
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  exRate
                </th> -->
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverId
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverName
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverWalletId
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverWalletNo
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverCurrency
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverValue
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  receiverDefRate
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  status
                </th>

                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  description
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  statusDate
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  riskScore
                </th> -->
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  ip
                </th> -->
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  cDate
                </th>
                <!-- <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  uDate
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-end text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[6px] capitalize"
                >
                  referenceNumber
                </th> -->
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
                  class="px-4 py-2.5 font-normal last:text-end lowercase text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.processType }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.customerName }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.senderWalletNo }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.currency }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.value }}
                </td>
                <td
                  class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[6px]"
                >
                  {{ data.fee }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.total }}
                </td>
                <td
                  class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[6px]"
                >
                  {{ data.receiverName }}
                </td>

                <td
                  class="px-4 py-2.5 font-normal last:text-end lowercase text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.receiverWalletNo }}
                </td>

                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.receiverValue }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  <span
                    class="inline-flex items-center justify-center bg-{{
                      data.statusClass
                    }}/10 text-{{
                      data.statusClass
                    }} min-h-[24px] px-3 text-xs font-medium rounded-[15px] capitalize"
                  >
                    {{ data.statusDisplay }}
                  </span>
                </td>

                <td
                  class="px-4 py-2.5 line-clamp-2 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.description }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end lowercase text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ formatDate(data.statusDate) }}
                </td>
                <td
                  class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[6px]"
                >
                  {{ formatDate(data.cDate) }}
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
  `,
})
export class TransactionListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  pageIndex = 1; // Current page index
  pageSize = 5; // Number of items per page
  listOfCurrentPageData: ProcessResponseReport[] = []; // Remove 'readonly'
  listOfData: ProcessResponseReport[] = [];
  setOfCheckedId = new Set<number>();
  fileName: string = '';
  exportFormat: string | undefined;
  fullListOfData: ProcessResponseReport[] = [];
  searchQuery: string = '';
  statusFilter = 'all';

  constructor(
    private http: HttpClient,
    private modalService: NzModalService,
    private transactionService: TransactionService,
    private datePipe: DatePipe
  ) {}

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    debugger;
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ProcessResponseReport[]): void {
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
    let model: ProcessReport = {
      customerId: 3887,
      startDate: new Date(2023, 7, 12),
      endDate: new Date(),
    };

    let data = await this.transactionService.getProcess(model);
    data.subscribe({
      next: (data) => {
        console.log(data);
        data.data.forEach((x) => {
          if (x.status == 0) {
            x.statusClass = 'warning';
            x.statusDisplay = 'Beklemede';
          }
          if (x.status == 1) {
            x.statusClass = 'success';
            x.statusDisplay = 'Başarılı';
          }
          if (x.status == 2) {
            x.statusClass = 'danger';
            x.statusDisplay = 'İptal';
          }
        });
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

  filterByStatus(): void {
    debugger;

    this.listOfData = this.applyFilters();
    this.listOfCurrentPageData = this.listOfData;
    this.pageIndex = 1; // Reset the page index to 1
    this.onPageIndexChanged(this.pageIndex);
  }

  private applyFilters(): ProcessResponseReport[] {
    debugger;
    if (this.statusFilter.toLowerCase() == 'all') {
      return this.fullListOfData;
    } else {
      return this.fullListOfData.filter(
        (data) =>
          data.statusDisplay.toLowerCase() === this.statusFilter.toLowerCase()
      );
    }
  }

  // Function to handle the search input change
  onSearch(searchText: string): void {
    this.searchQuery = searchText.trim().toLowerCase();
    if (this.searchQuery) {
      // Filter the data based on the search query
      this.listOfData = this.fullListOfData.filter((employee) =>
        employee.customerName.toLowerCase().includes(this.searchQuery)
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
    this.listOfCurrentPageData = this.listOfData.slice(startIndex, endIndex);
  }

  formatDate(inputString: string) {
    const date = new Date(inputString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript'te aylar 0 ile 11 arasında indekslenir, bu yüzden 1 eklememiz gerekir
    const year = date.getFullYear();

    // Saat ve dakika bilgilerini al
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // İstenen formatı oluştur
    return `${day}/${month}/${year % 100}: ${hours}:${minutes}`;
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
  exportData(selectedEmployees: ProcessResponseReport[]) {
    const fileName = this.fileName.trim() || 'exported_data';
    if (this.exportFormat === 'CSV') {
      const csvData = selectedEmployees.map(
        (employee) => `${employee.customerName},${employee.description}`
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
}
