import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditWorkshopRoutingModule} from "./edit-workshop-routing.module";
import { EditWorkshopComponent } from './edit-workshop.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditWorkshopComponent
  ],
  imports: [
    CommonModule,
    EditWorkshopRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditWorkshopModule { }
