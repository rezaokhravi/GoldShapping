import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangesComponent } from './exchanges.component';
import {PrimeModule} from "../../primeng.module";
import {WholesalerModule} from "./wholesaler/wholesaler.module";
import {WorkshopModule} from "./workshop/workshop.module";
import {ExchangeModule} from "./exchange/exchange.module";

@NgModule({
  declarations: [
    ExchangesComponent,
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    PrimeModule,
    WholesalerModule,
    WorkshopModule,
    ExchangeModule
  ]
})
export class ExchangesModule { }
