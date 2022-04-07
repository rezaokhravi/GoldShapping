import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitedTransactionComponent} from "./exited-transaction.component";





const routes: Routes = [

  {
    path: '',
    component: ExitedTransactionComponent,
    children: [
      {
        path: 'goods',
        children: [
          {
            path: '',
            loadChildren: () => import('./exited-transaction.module').then(m => m.ExitedTransactionModule)
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
export class ExitedTransactionRoutingModule {
}
