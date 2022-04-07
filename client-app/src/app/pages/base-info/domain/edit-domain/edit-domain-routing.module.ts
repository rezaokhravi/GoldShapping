import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditDomainComponent} from "./edit-domain.component";


const routes: Routes = [{ path: '', component: EditDomainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDomainRoutingModule { }
