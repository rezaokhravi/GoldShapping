import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceComponent } from './advice.component';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdviceRoutingModule} from "./advice-routing.module";
import {PaymentModule} from "../../payment/payment.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";
import {TransactionReportModule} from "../../../reports/transaction-report/transaction-report.module";
import {CustomerReportModule} from "../../../reports/customer-report/customer-report.module";
import {CustomersModule} from "../../../base-info/customers/customers.module";
import {AddExternalCustomerModule} from "../../../base-info/customers/add-external-customer/add-external-customer.module";



@NgModule({
  declarations: [
    AdviceComponent,
  ],
  exports: [
    AdviceComponent
  ],
  imports: [
    CommonModule,
    AdviceRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentModule,
    NgxJDatePickerModule,
    CustomerReportModule,
    AddExternalCustomerModule
  ]
})
export class AdviceModule { }
