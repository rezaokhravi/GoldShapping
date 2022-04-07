import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditGoodComponent} from "./edit-good.component";

const routes: Routes = [{ path: '', component: EditGoodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGoodRoutingModule { }
