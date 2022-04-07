import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { WholesalerComponent } from './wholesaler.component';
import {PrimeModule} from "../../../primeng.module";
import {EditWholesalerModule} from "./edit-wholesaler/edit-wholesaler.module";


@NgModule({
  declarations: [
    WholesalerComponent
  ],
  imports: [
    CommonModule,
    WholesalerRoutingModule,
    PrimeModule,
    EditWholesalerModule,
  ]
})
export class WholesalerModule { }
