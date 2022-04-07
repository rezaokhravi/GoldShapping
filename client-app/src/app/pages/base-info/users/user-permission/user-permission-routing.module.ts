import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPermissionComponent} from "./user-permission.component";

const routes: Routes = [{ path: '', component: UserPermissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPermissionRoutingModule { }
