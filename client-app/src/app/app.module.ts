import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SlideComponent } from './components/slide/slide.component';
import { HeadeComponent } from './components/heade/heade.component';
import { FooterComponent } from './components/footer/footer.component';

import {PrimeModule} from "./primeng.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {maskConfig} from "./domains/daomins";
import {Interceptor} from "./services/interceptor";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";



@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
    HeadeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    DialogService,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
