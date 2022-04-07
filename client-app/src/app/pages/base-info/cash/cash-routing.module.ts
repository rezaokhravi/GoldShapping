import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CashComponent} from './cash.component';





const routes: Routes = [

  {
    path: '',
    component: CashComponent,
    children: [
      {
        path: 'cash',
        children: [
          {
            path: '',
            loadChildren: () => import('./cash.module').then(m => m.CashModule)
          },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRoutingModule {
}
