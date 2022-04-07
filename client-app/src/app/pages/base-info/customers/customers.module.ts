import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import {PrimeModule} from "../../../primeng.module";
import {EditCustomerModule} from "./edit-customer/edit-customer.module";


@NgModule({
  declarations: [
    CustomersComponent
  ],
  exports: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    PrimeModule,
    EditCustomerModule
  ]
})
export class CustomersModule { }
