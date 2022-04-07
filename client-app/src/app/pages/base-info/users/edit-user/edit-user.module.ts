import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserRoutingModule} from "./edit-user-routing.module";
import {EditUserComponent} from './edit-user.component';
import {PrimeModule} from "../../../../primeng.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditUserModule{
}
