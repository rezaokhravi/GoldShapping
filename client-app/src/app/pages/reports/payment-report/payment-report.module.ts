import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {PaymentReportComponent} from "./payment-report.component";
import {PaymentReportRoutingModule} from "./payment-report-routing.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";


@NgModule({
  declarations: [
    PaymentReportComponent,
  ],
  exports: [
    PaymentReportComponent
  ],
  imports: [
    CommonModule,
    PaymentReportRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class PaymentReportModule {
}
