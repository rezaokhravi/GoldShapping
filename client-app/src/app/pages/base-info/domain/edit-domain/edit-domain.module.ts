import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditDomainComponent} from "./edit-domain.component";
import {EditDomainRoutingModule} from "./edit-domain-routing.module";



@NgModule({
  declarations: [
    EditDomainComponent
  ],
  imports: [
    CommonModule,
    EditDomainRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditDomainModule { }
