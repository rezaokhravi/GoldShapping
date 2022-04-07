import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdviceComponent} from "./advice.component";


const routes: Routes = [{ path: '', component:AdviceComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdviceRoutingModule { }
