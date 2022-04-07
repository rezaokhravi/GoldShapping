import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from "./components/reports/reports.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'reports', pathMatch: 'full'},
  {path: 'reports',
    children:[
      {
        path: '',
        redirectTo: 'PageNotFound',
        pathMatch: 'full'
      },
      {
        path: 'PageNotFound',
        component: PageNotFoundComponent,
      },
      {
        path: ':data',
        component: ReportsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
