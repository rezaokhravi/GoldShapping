import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeModule} from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {WholesalerReportComponent} from "./wholesaler-report.component";
import {WholesalerReportRoutingModule} from "./wholesaler-report-routing.module";
import {PaymentReportModule} from "../payment-report/payment-report.module";
import {PaymentModule} from "../../exchanges/payment/payment.module";


@NgModule({
  declarations: [
    WholesalerReportComponent,
  ],
  exports: [
    WholesalerReportComponent
  ],
  imports: [
    CommonModule,
    WholesalerReportRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    PaymentReportModule,
    PaymentModule
  ]
})
export class WholesalerReportModule {
}
