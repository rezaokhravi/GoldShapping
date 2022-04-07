import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WholesalerComponent } from './wholesaler.component';

const routes: Routes = [{ path: '', component: WholesalerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
