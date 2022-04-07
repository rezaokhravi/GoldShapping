import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PrimeModule } from 'src/app/primeng.module';
import {CustomerReportComponent} from "./customer-report.component";
import {CustomerReportRoutingModule} from "./customer-report-routing.module";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {NgxJDatePickerModule} from "ngx-jdatepicker";
import {PaymentReportModule} from "../payment-report/payment-report.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";





@NgModule({
  declarations: [
    CustomerReportComponent,
  ],
  exports: [
    CustomerReportComponent
  ],
    imports: [
        CommonModule,
        CustomerReportRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentReportModule,
      PaymentModule,
        NgxMaskModule.forRoot(maskConfig),
        NgxJDatePickerModule,
    ]
})
export class CustomerReportModule { }
