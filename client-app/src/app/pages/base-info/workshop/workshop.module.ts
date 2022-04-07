import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import {PrimeModule} from "../../../primeng.module";
import {EditWorkshopModule} from "./edit-workshop/edit-workshop.module";


@NgModule({
  declarations: [
    WorkshopComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    PrimeModule,
    EditWorkshopModule,
  ]
})
export class WorkshopModule { }
