import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import {PrimeModule} from "../../../primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditStorageModule} from "./edit-storage/edit-storage.module";
import {ExitedTransactionModule} from "../exited-transaction/exited-transaction.module";



@NgModule({
  declarations: [
    StorageComponent
  ],
  imports: [
    CommonModule,
    StorageRoutingModule,
    PrimeModule,
    ReactiveFormsModule,
    EditStorageModule,
    ExitedTransactionModule
  ]
})
export class StorageModule { }
