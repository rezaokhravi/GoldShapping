import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReceiveComponent} from "./receive.component";
import {ReceiveRoutingModule} from "./receive-routing.module";
import {PaymentModule} from "../../payment/payment.module";
import {NgxJDatePickerModule} from "ngx-jdatepicker";



@NgModule({
  declarations: [
    ReceiveComponent,
  ],
  exports: [
    ReceiveComponent
  ],
    imports: [
        CommonModule,
        ReceiveRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentModule,
      NgxJDatePickerModule,
    ]
})
export class ReceiveModule { }
