import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {GoodServices} from "../services/good.services";
export const goodsApi = express.Router();


goodsApi.post('/create', async (req, res, next) => {
    if (req.body.hasOwnProperty('good')){
       await new GoodServices().addGood(req.body.good).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:500,
            data:[],
            faMessage:'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});



goodsApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('good')){
        await new GoodServices().editGood(req.body.good).then((result:IPublicRequest) => {
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


goodsApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('good')){
        await new GoodServices().deleteGood(req.body.good).then((result:IPublicRequest) => {
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

goodsApi.get('/getAll', async (req, res, next) => {
    await new GoodServices().getAllGood().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

goodsApi.get('/getGoodTitle', async (req, res, next) => {
    await new GoodServices().getGoodTitle().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});


