import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {WorkshopReportComponent} from "./workshop-report.component";
import {WorkshopReportRoutingModule} from "./workshop-report-routing.module";
import {PaymentReportModule} from "../payment-report/payment-report.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";


@NgModule({
  declarations: [
    WorkshopReportComponent,
  ],
  exports: [
    WorkshopReportComponent
  ],
  imports: [
    CommonModule,
    WorkshopReportRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    PaymentReportModule,
    NgxJDatePickerModule,
    PaymentModule
  ]
})
export class WorkshopReportModule {
}
