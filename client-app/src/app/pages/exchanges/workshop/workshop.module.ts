import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import {PrimeModule} from "../../../primeng.module";
import {ReceiveModule} from "./receive/receive.module";
import {DeliverModule} from "./deliver/deliver.module";


@NgModule({
  declarations: [
    WorkshopComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    PrimeModule,
    ReceiveModule,
    DeliverModule
  ],
  exports: [
    WorkshopComponent
  ]
})
export class WorkshopModule { }
