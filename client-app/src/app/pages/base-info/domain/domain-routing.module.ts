import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomainComponent} from "./domain.component";





const routes: Routes = [

  {
    path: '',
    component: DomainComponent,
    children: [
      {
        path: 'domain',
        children: [
          {
            path: '',
            loadChildren: () => import('./domain.module').then(m => m.DomainModule)
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
export class DomainRoutingModule {
}
