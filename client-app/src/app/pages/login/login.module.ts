import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { PrimeModule } from 'src/app/primeng.module';




@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class LoginModule { }
