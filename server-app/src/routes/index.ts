import express from 'express';
import {domainsApi} from '../api/domains.router'
import {usersApi} from "../api/users.router";
import {goodsApi} from "../api/goods.router";
import {storageApi} from "../api/storage.router";
import {cashesApi} from "../api/cashes.router";
import {customersApi} from "../api/customers.router";
import {wholesalersApi} from "../api/wholesalers.router";
import {workshopsApi} from "../api/workshops.router";
import {authApi} from "../api/auth.router";
import {transactionApi} from "../api/transaction.router";
import {paymentApi} from "../api/payments.router";
import {reportsApi} from "../api/reports.router";
import {userPermissionApi} from "../api/user-permission.router";
import {menuApi} from "../api/menu.router";
import {dashboardApi} from "../api/dashboard.router";
import {exitedTransactionApi} from "../api/exited-transaction.router";

export const routes = express();

// routes
routes.use('/domains', domainsApi);
routes.use('/users', usersApi);
routes.use('/goods', goodsApi);
routes.use('/exitedTransactions', exitedTransactionApi);
routes.use('/storage', storageApi);
routes.use('/cashes', cashesApi);
routes.use('/customers', customersApi);
routes.use('/wholesalers', wholesalersApi);
routes.use('/workshops', workshopsApi);
routes.use('/auth', authApi);
routes.use('/transaction', transactionApi);
routes.use('/payments', paymentApi);
routes.use('/reports', reportsApi);
routes.use('/userPermission', userPermissionApi);
routes.use('/menus', menuApi);
routes.use('/dashboard', dashboardApi);


