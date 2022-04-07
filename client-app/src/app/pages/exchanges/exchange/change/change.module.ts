import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeComponent} from "./change.component";
import {ChangeRoutingModule} from "./change-routing.module";
import {PurchaseModule} from "../purchase/purchase.module";
import {SaleModule} from "../sale/sale.module";



@NgModule({
  declarations: [
    ChangeComponent,
  ],
  exports: [
    ChangeComponent
  ],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    PrimeModule,
    FormsModule,
    PurchaseModule,
    SaleModule,
    ReactiveFormsModule
  ]
})
export class ChangeModule { }
