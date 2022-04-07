import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceiveComponent} from "./receive.component";


const routes: Routes = [{ path: '', component:    ReceiveComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveRoutingModule { }
