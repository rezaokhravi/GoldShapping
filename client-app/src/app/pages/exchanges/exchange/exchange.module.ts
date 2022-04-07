import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from './exchange.component';
import {PrimeModule} from "../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdviceModule} from "./advice/advice.module";
import {SaleModule} from "./sale/sale.module";
import {PurchaseModule} from "./purchase/purchase.module";
import {ChangeModule} from "./change/change.module";


@NgModule({
  declarations: [
    ExchangeComponent,
  ],
  exports: [
    ExchangeComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    AdviceModule,
    SaleModule,
    PurchaseModule,
    ChangeModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExchangeModule { }
