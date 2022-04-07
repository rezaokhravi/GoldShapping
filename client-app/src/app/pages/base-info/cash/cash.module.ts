import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRoutingModule } from './cash-routing.module';
import { CashComponent } from './cash.component';
import {PrimeModule} from "../../../primeng.module";
import {EditCashModule} from "./edit-cash/edit-cash.module";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";



@NgModule({
  declarations: [
    CashComponent
  ],
  imports: [
    CommonModule,
    CashRoutingModule,
    PrimeModule,
    EditCashModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class CashModule { }
