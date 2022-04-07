import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PaymentComponent } from './payment.component';
import {PaymentRoutingModule} from "./payment-routing.module";
import { PrimeModule } from 'src/app/primeng.module';
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";




@NgModule({
  declarations: [
    PaymentComponent,
  ],
  exports: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class PaymentModule { }
