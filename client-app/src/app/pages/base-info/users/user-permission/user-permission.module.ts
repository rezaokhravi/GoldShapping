import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import { ReactiveFormsModule } from '@angular/forms';
import {UserPermissionComponent} from "./user-permission.component";
import {UserPermissionRoutingModule} from "./user-permission-routing.module";
import {EditPermissionModule} from "./edit-permission/edit-permission.module";


@NgModule({
  declarations: [
    UserPermissionComponent
  ],
  imports: [
    CommonModule,
    UserPermissionRoutingModule,
    PrimeModule,
    EditPermissionModule,
    ReactiveFormsModule
  ]
})
export class UserPermissionModule{
}
