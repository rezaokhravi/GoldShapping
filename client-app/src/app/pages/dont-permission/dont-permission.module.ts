import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../primeng.module";
import {DontPermissionComponent} from "./dont-permission.component";
import {DontPermissionRoutingModule} from "./dont-permission-routing.module";


@NgModule({
  declarations: [
    DontPermissionComponent
  ],
  imports: [
    CommonModule,
    DontPermissionRoutingModule,
    PrimeModule
  ]
})
export class DontPermissionModule { }
