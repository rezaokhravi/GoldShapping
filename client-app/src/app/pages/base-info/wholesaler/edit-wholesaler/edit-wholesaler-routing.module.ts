import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditWholesalerComponent} from "./edit-wholesaler.component";

const routes: Routes = [{ path: '', component: EditWholesalerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWholesalerRoutingModule { }
