import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditCustomerRoutingModule} from "./edit-customer-routing.module";
import { EditCustomerComponent } from './edit-customer.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    EditCustomerRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditCustomerModule { }
