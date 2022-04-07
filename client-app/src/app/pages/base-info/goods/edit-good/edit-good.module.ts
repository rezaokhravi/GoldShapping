import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditGoodRoutingModule} from "./edit-good-routing.module";
import { EditGoodComponent } from './edit-good.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditGoodComponent
  ],
  imports: [
    CommonModule,
    EditGoodRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditGoodModule { }
