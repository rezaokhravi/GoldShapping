import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditMenuRoutingModule} from "./edit-menu-routing.module";
import { EditMenuComponent } from './edit-menu.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditMenuComponent
  ],
  imports: [
    CommonModule,
    EditMenuRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditMenuModule { }
