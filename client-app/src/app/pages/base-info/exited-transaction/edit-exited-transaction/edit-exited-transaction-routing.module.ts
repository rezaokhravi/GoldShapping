import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditExitedTransactionComponent} from "./edit-exited-transaction.component";

const routes: Routes = [{ path: '', component: EditExitedTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExitedTransactionRoutingModule { }
