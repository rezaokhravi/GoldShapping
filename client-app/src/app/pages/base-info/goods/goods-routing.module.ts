import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoodsComponent} from './goods.component';





const routes: Routes = [

  {
    path: '',
    component: GoodsComponent,
    children: [
      {
        path: 'goods',
        children: [
          {
            path: '',
            loadChildren: () => import('./goods.module').then(m => m.GoodsModule)
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
export class GoodsRoutingModule {
}
