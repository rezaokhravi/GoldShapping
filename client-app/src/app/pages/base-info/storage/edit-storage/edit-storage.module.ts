import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditStorageRoutingModule} from "./edit-storage-routing.module";
import { EditStorageComponent } from './edit-storage.component';
import {PrimeModule} from "../../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditStorageComponent
  ],
  imports: [
    CommonModule,
    EditStorageRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class EditStorageModule { }
