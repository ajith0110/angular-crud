import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpaddComponent } from './pages/emp/empadd/empadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { ApplyleaveComponent } from './pages/manageleaves/applyleave/applyleave.component';
import { LeavelistviewComponent } from './pages/leave-list/leavelistview/leavelistview.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DisableWeekendDirective } from './disable-weekend.directive';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetbackgroundDirective } from './customdirectives/setbackground.directive';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, ApplyleaveComponent, LeavelistviewComponent, DisableWeekendDirective, SetbackgroundDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    EmpaddComponent,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot(), // Essential, mandatory confirm box module.
    ToastNotificationConfigModule.forRoot(),

    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 40,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 500,
      backgroundPadding: 0,
      showSubtitle: false,
      showUnits: false,
      showInnerStroke: false,
      showTitle: true,
    }),
     BrowserAnimationsModule,
     
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
