import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { WholesalerComponent } from './wholesaler.component';
import {PrimeModule} from "../../../primeng.module";
import {PaymentModule} from "../payment/payment.module";


@NgModule({
  declarations: [
    WholesalerComponent
  ],
  exports: [
    WholesalerComponent
  ],
    imports: [
        CommonModule,
        WholesalerRoutingModule,
        PrimeModule,
        PaymentModule
    ]
})
export class WholesalerModule { }
