import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WholesalerReportComponent} from "./wholesaler-report.component";


const routes: Routes = [{ path: '', component:WholesalerReportComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerReportRoutingModule { }
