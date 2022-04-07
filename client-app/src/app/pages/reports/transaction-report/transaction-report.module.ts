import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {TransactionReportComponent} from "./transaction-report.component";
import {TransactionReportRoutingModule} from "./transaction-report-routing.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";
import {PaymentReportModule} from "../payment-report/payment-report.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";


@NgModule({
  declarations: [
    TransactionReportComponent,
  ],
  exports: [
    TransactionReportComponent
  ],
  imports: [
    CommonModule,
    TransactionReportRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxJDatePickerModule,
    PaymentReportModule,
    PaymentModule
  ]
})
export class TransactionReportModule {
}
