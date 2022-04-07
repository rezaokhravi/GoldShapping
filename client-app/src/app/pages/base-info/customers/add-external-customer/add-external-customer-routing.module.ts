import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddExternalCustomerComponent} from "./add-external-customer.component";


const routes: Routes = [{ path: '', component: AddExternalCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExternalCustomerRoutingModule { }
