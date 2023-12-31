import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ToastrModule } from 'ngx-toastr';
import {
  registerLocaleData,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { ThemeConstantService } from './shared/services/theme-constant.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { LanguageService } from './shared/services/language.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { HttpErrorHandlerInterceptorService } from './shared/services/http-error-handler-interceptor.service';
import { ApplicationsService } from './shared/services/applications.service';
import { RolesService } from './shared/services/roles.service';
import { UsersService } from './shared/services/users.service';
import { CompanyService } from './shared/services/company.service';
import { TransactionService } from './shared/services/transaction.service';

registerLocaleData(en);

export function setupTranslateFactory(service: LanguageService): Function {
  return () => service.use('tr');
}
@NgModule({
  declarations: [AppComponent, CommonLayoutComponent, FullLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TemplateModule,
    SharedModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NgChartsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularSvgIconModule.forRoot(),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [LanguageService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
    ThemeConstantService,
    AuthenticationService,
    ApplicationsService,
    RolesService,
    UsersService,
    CompanyService,
    TransactionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
