import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditWholesalerRoutingModule} from "./edit-wholesaler-routing.module";
import { EditWholesalerComponent } from './edit-wholesaler.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditWholesalerComponent
  ],
  imports: [
    CommonModule,
    EditWholesalerRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditWholesalerModule { }
