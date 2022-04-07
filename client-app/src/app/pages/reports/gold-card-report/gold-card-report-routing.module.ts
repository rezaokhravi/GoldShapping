import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoldCardReportComponent} from "./gold-card-report.component";


const routes: Routes = [{ path: '', component:GoldCardReportComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldCardReportRoutingModule { }
