import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditExitedTransactionComponent} from "./edit-exited-transaction.component";
import {EditExitedTransactionRoutingModule} from "./edit-exited-transaction-routing.module";



@NgModule({
  declarations: [
    EditExitedTransactionComponent
  ],
  imports: [
    CommonModule,
    EditExitedTransactionRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditExitedTransactionModule { }
