import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu.component';





const routes: Routes = [

  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'cash',
        children: [
          {
            path: '',
            loadChildren: () => import('./menu.module').then(m => m.MenuModule)
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
export class MenuRoutingModule {
}
