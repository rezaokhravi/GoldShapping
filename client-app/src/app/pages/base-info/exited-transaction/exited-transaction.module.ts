import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ExitedTransactionComponent} from "./exited-transaction.component";
import {ExitedTransactionRoutingModule} from "./exited-transaction-routing.module";
import {EditExitedTransactionModule} from "./edit-exited-transaction/edit-exited-transaction.module";


@NgModule({
  declarations: [
    ExitedTransactionComponent
  ],
  imports: [
    CommonModule,
    ExitedTransactionRoutingModule,
    PrimeModule,
    ReactiveFormsModule,
    EditExitedTransactionModule
  ]
})
export class ExitedTransactionModule { }
