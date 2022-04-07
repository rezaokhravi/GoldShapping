import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';





const routes: Routes = [

  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'storage',
        children: [
          {
            path: '',
            loadChildren: () => import('./users.module').then(m => m.UsersModule)
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
export class UsersRoutingModule {
}
