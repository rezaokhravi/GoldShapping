import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsComponent } from './goods.component';
import {PrimeModule} from "../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditGoodModule} from "./edit-good/edit-good.module";


@NgModule({
  declarations: [
    GoodsComponent
  ],
  imports: [
    CommonModule,
    GoodsRoutingModule,
    PrimeModule,
    ReactiveFormsModule,
    EditGoodModule
  ]
})
export class GoodsModule { }
