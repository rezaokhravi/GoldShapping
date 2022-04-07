import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../../../primeng.module";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";
import {DomainComponent} from "./domain.component";
import {DomainRoutingModule} from "./domain-routing.module";
import {EditDomainModule} from "./edit-domain/edit-domain.module";



@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    PrimeModule,
    EditDomainModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class DomainModule { }
