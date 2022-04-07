import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AddExternalCustomerComponent} from "./add-external-customer.component";
import {AddExternalCustomerRoutingModule} from "./add-external-customer-routing.module";



@NgModule({
  declarations: [
    AddExternalCustomerComponent
  ],
  exports: [
    AddExternalCustomerComponent
  ],
  imports: [
    CommonModule,
    AddExternalCustomerRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class AddExternalCustomerModule { }
