import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkshopReportComponent} from "./workshop-report.component";



const routes: Routes = [{ path: '', component:WorkshopReportComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopReportRoutingModule { }
