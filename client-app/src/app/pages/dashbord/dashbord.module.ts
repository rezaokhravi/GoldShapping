import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import {PrimeModule} from "../../primeng.module";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../domains/daomins";


@NgModule({
  declarations: [
    DashbordComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    PrimeModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class DashbordModule { }
