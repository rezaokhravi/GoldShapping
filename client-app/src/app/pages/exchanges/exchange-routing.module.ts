import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExchangesComponent} from './exchanges.component';
import {WholesalerComponent} from "./wholesaler/wholesaler.component";





const routes: Routes = [{ path: '', component: ExchangesComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {
}
