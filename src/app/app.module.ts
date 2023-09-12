
import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { NgChartsModule  } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { ThemeConstantService } from './shared/services/theme-constant.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { LanguagePipe } from './shared/pipes/language.pipe';
import { LanguageService } from './shared/services/language.service';

registerLocaleData(en);

export function setupTranslateFactory(
  service: LanguageService): Function {
  return () => service.use('tr');
}
@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
        LanguagePipe
    ],
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
        AngularSvgIconModule.forRoot(),
        
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateFactory,
            deps: [ LanguageService ],
            multi: true
          },
        ThemeConstantService,
        AuthenticationService,
      
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
