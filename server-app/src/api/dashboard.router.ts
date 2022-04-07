import express from 'express';
import {IPublicRequest} from "../models/request.model";
import {DashboardServices} from "../services/dashboard.services";
export const dashboardApi = express.Router();

dashboardApi.get('/getFnDashboardTransaction', async (req, res, next) => {
    await new DashboardServices().getFnDashboardTransaction().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardGoldCreature', async (req, res, next) => {
    await new DashboardServices().getFnDashboardGoldCreature().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardStorageCreature', async (req, res, next) => {
    await new DashboardServices().getFnDashboardStorageCreature().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardCashCreature', async (req, res, next) => {
    await new DashboardServices().getFnDashboardCashCreature().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardGoldCard', async (req, res, next) => {
    await new DashboardServices().getFnDashboardGoldCard().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardOrders', async (req, res, next) => {
    await new DashboardServices().getFnDashboardOrders().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardTransactionToDay', async (req, res, next) => {
    await new DashboardServices().getFnDashboardTransactionToDay().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

dashboardApi.get('/getFnDashboardGoodCreature', async (req, res, next) => {
    await new DashboardServices().getFnDashboardGoodCreature().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});
