import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../services/auth-guard";
import {DontPermissionComponent} from "./dont-permission.component";

const routes: Routes = [
  { path: '',
    component: DontPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DontPermissionRoutingModule { }
