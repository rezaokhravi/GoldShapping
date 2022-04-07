import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditWorkshopComponent} from "./edit-workshop.component";

const routes: Routes = [{ path: '', component: EditWorkshopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWorkshopRoutingModule { }
