import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PurchaseComponent} from "./purchase.component";
import {PurchaseRoutingModule} from "./purchase-routing.module";
import {PaymentModule} from "../../payment/payment.module";
import {CustomersModule} from "../../../base-info/customers/customers.module";
import {AddExternalCustomerModule} from "../../../base-info/customers/add-external-customer/add-external-customer.module";



@NgModule({
  declarations: [
    PurchaseComponent,
  ],
  exports: [
    PurchaseComponent
  ],
    imports: [
        CommonModule,
        PurchaseRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentModule,
      AddExternalCustomerModule
    ]
})
export class PurchaseModule { }
