import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditCashRoutingModule} from "./edit-cash-routing.module";
import { EditCashComponent } from './edit-cash.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditCashComponent
  ],
  imports: [
    CommonModule,
    EditCashRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditCashModule { }
