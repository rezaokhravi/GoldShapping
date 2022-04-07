import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WholesalerComponent} from './wholesaler.component';





const routes: Routes = [

  {
    path: '',
    component: WholesalerComponent,
    children: [
      {
        path: 'wholesaler',
        children: [
          {
            path: '',
            loadChildren: () => import('./wholesaler.module').then(m => m.WholesalerModule)
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
export class WholesalerRoutingModule {
}
