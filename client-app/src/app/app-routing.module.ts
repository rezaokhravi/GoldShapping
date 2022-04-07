import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashbord',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashbord',
    loadChildren: () => import('./pages/dashbord/dashbord.module').then(m => m.DashbordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'noPermission',
    loadChildren: () => import('./pages/dont-permission/dont-permission.module').then(m => m.DontPermissionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'exchanges',
    loadChildren: () => import('./pages/exchanges/exchanges.module').then(m => m.ExchangesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/base-info/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'goods',
    loadChildren: () => import('./pages/base-info/goods/goods.module').then(m => m.GoodsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'storage',
    loadChildren: () => import('./pages/base-info/storage/storage.module').then(m => m.StorageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cash',
    loadChildren: () => import('./pages/base-info/cash/cash.module').then(m => m.CashModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wholesaler',
    loadChildren: () => import('./pages/base-info/wholesaler/wholesaler.module').then(m => m.WholesalerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workshop',
    loadChildren: () => import('./pages/base-info/workshop/workshop.module').then(m => m.WorkshopModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/base-info/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menus',
    loadChildren: () => import('./pages/base-info/menu/menu.module').then(m => m.MenuModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'domains',
    loadChildren: () => import('./pages/base-info/domain/domain.module').then(m => m.DomainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customerReport',
    loadChildren: () => import('./pages/reports/customer-report/customer-report.module').then(m => m.CustomerReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'goldCardReport',
    loadChildren: () => import('./pages/reports/gold-card-report/gold-card-report.module').then(m => m.GoldCardReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transactionReport',
    loadChildren: () => import('./pages/reports/transaction-report/transaction-report.module').then(m => m.TransactionReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wholesalerReport',
    loadChildren: () => import('./pages/reports/wholesaler-report/wholesaler-report.module').then(m => m.WholesalerReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workshopReport',
    loadChildren: () => import('./pages/reports/workshop-report/workshop-report.module').then(m => m.WorkshopReportModule),
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
