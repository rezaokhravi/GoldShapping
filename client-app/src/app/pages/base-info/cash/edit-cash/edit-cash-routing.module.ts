import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditCashComponent} from "./edit-cash.component";

const routes: Routes = [{ path: '', component: EditCashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCashRoutingModule { }
