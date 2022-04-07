import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SaleComponent} from "./sale.component";
import {SaleRoutingModule} from './sale-routing.module';
import {PaymentModule} from "../../payment/payment.module";
import {CustomersModule} from "../../../base-info/customers/customers.module";
import {AddExternalCustomerModule} from "../../../base-info/customers/add-external-customer/add-external-customer.module";


@NgModule({
  declarations: [
    SaleComponent,
  ],
  exports: [
    SaleComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentModule,
    AddExternalCustomerModule
  ]
})
export class SaleModule {
}

