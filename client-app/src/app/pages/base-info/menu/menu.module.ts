import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import {PrimeModule} from "../../../primeng.module";
import {EditMenuModule} from "./edit-menu/edit-menu.module";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "../../../domains/daomins";



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    PrimeModule,
    EditMenuModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class MenuModule { }
