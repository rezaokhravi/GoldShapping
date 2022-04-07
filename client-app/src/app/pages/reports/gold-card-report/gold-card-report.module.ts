import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PrimeModule } from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {GoldCardReportComponent} from "./gold-card-report.component";
import {GoldCardReportRoutingModule} from "./gold-card-report-routing.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";
import {PaymentReportModule} from "../payment-report/payment-report.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";




@NgModule({
  declarations: [
    GoldCardReportComponent,
  ],
  exports: [
    GoldCardReportComponent
  ],
    imports: [
        CommonModule,
        GoldCardReportRoutingModule,
        PrimeModule,
        FormsModule,
      PaymentModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(maskConfig),
        NgxJDatePickerModule,
        PaymentReportModule,
    ]
})
export class GoldCardReportModule { }
