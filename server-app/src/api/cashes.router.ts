import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {CashServices} from "../services/cash.services";

export const cashesApi = express.Router();


cashesApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('cash')){
        await new CashServices().addCash(req.body.cash).then((result:IPublicRequest) => {
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



cashesApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('cash')){
        await new CashServices().editCash(req.body.cash).then((result:IPublicRequest) => {
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


cashesApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('cash')){
        await new CashServices().deleteCash(req.body.cash).then((result:IPublicRequest) => {
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

cashesApi.get('/getAll', async (req, res, next) => {
    await new CashServices().getAllCash().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

cashesApi.get('/getCashesTitle', async (req, res, next) => {
    await new CashServices().getCashesTitle().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



