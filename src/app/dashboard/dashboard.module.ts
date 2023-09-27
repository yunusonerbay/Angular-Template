import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-om-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-om-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-om-perfect-scrollbar';

import { TransactionComponent } from './transaction/transaction.component';
import { OverviewListComponent } from '../container/dashboard/demoTwo/overviewList.component';
import { SaleRevenueComponent } from '../container/dashboard/demoTwo/salesRevenue.component';
import { SourceRevenueGenerated } from '../container/dashboard/demoTwo/sourceRevenueGenerated.component';
import { NewProductComponent } from '../container/dashboard/demoTwo/newProduct.component';
import { BestSellerComponent } from '../container/dashboard/demoTwo/bestSeller.component';
import { DashboardComponent } from './dashboard.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { FeaturesModule } from '../features/features.module';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/userList';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const antdModule = [
  NzLayoutModule,
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzCheckboxModule,
  NzBreadCrumbModule,
  NzGridModule,
  NzSkeletonModule,
  NzPaginationModule,
  AngularSvgIconModule.forRoot(),
  NgChartsModule,
  NgApexchartsModule,
  PerfectScrollbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    FeaturesModule,
    ...antdModule,
  ],
  exports: [BestSellerComponent, SaleRevenueComponent, SourceRevenueGenerated],
  declarations: [
    TransactionComponent,
    OverviewListComponent,
    SaleRevenueComponent,
    SourceRevenueGenerated,
    NewProductComponent,
    BestSellerComponent,
    DashboardComponent,
    EndpointsComponent,
    UsersComponent,
    UserListComponent,
  ],
  providers: [
    ThemeConstantService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class DashboardModule {}
