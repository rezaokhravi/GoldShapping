import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeliverComponent} from "./deliver.component";
import {DeliverRoutingModule} from "./deliver-routing.module";
import {PaymentModule} from "../../payment/payment.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";




@NgModule({
  declarations: [
    DeliverComponent,
  ],
  exports: [
    DeliverComponent
  ],
    imports: [
        CommonModule,
        DeliverRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentModule,
        NgxJDatePickerModule,
    ]
})
export class DeliverModule { }
