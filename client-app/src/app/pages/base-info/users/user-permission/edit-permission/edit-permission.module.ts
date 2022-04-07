import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPermissionRoutingModule} from "./edit-permission-routing.module";
import {EditPermissionComponent} from './edit-permission.component';
import { ReactiveFormsModule } from '@angular/forms';
import {PrimeModule} from "../../../../../primeng.module";


@NgModule({
  declarations: [
    EditPermissionComponent
  ],
  imports: [
    CommonModule,
    EditPermissionRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditPermissionModule {
}
