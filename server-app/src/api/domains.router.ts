import express from 'express';
import {IPublicRequest} from "../models/request.model";
import {DomainServices} from "../services/domain.services";
import {MenuServices} from "../services/menu.services";
export const domainsApi = express.Router();



domainsApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('domain')){
        await new DomainServices().addDomain(req.body.domain).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});


domainsApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('domain')){
        await new DomainServices().editDomain(req.body.domain).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});


domainsApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('domain')){
        await new DomainServices().deleteDomain(req.body.domain).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت حذف ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});


domainsApi.post('/getAllDomainById', async (req, res, next) => {

    if (req.body.hasOwnProperty('domId')){
        await new DomainServices().getAllDomainById(req.body.domId).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت حذف ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

domainsApi.get('/getDomainTitle', async (req, res, next) => {
    await new DomainServices().getDomainTitle().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});




domainsApi.get('/orderType', async (req, res, next) => {
    await new DomainServices().getOrderType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});


domainsApi.get('/goldAccountType', async (req, res, next) => {
    await new DomainServices().getGoldAccountType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/gemType', async (req, res, next) => {
    await new DomainServices().getGemType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});


domainsApi.get('/exchangeType', async (req, res, next) => {
    await new DomainServices().getExchangeType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/receivedStatement', async (req, res, next) => {
    await new DomainServices().getReceivedStatement().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/userType', async (req, res, next) => {
    await new DomainServices().getUserType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/goodType', async (req, res, next) => {
    await new DomainServices().getGoodType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/goldType', async (req, res, next) => {
    await new DomainServices().getGoldType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/storageType', async (req, res, next) => {
    await new DomainServices().getStorageType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/cashType', async (req, res, next) => {
    await new DomainServices().getCashType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/gender', async (req, res, next) => {
    await new DomainServices().getGender().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/orderModel', async (req, res, next) => {
    await new DomainServices().getOrderModel().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/accountType', async (req, res, next) => {
    await new DomainServices().getAccountType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/behalfType', async (req, res, next) => {
    await new DomainServices().getBehalfType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

domainsApi.get('/paymentType', async (req, res, next) => {
    await new DomainServices().getPaymentType().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});


