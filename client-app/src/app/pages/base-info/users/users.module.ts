import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {PrimeModule} from "../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditUserModule} from "./edit-user/edit-user.module";
import {UserPermissionModule} from "./user-permission/user-permission.module";



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PrimeModule,
    ReactiveFormsModule,
    EditUserModule,
    UserPermissionModule,
  ]
})
export class UsersModule { }
