import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StorageComponent} from './storage.component';





const routes: Routes = [

  {
    path: '',
    component: StorageComponent,
    children: [
      {
        path: 'storage',
        children: [
          {
            path: '',
            loadChildren: () => import('./storage.module').then(m => m.StorageModule)
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
export class StorageRoutingModule {
}
