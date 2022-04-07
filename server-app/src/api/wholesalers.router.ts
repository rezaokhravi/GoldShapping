import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {WholesalerServices} from "../services/wholesaler.services";

export const wholesalersApi = express.Router();


wholesalersApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('wholesaler')){
        await new WholesalerServices().addWholesaler(req.body.wholesaler).then((result:IPublicRequest) => {
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


wholesalersApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('wholesaler')){
        await new WholesalerServices().editWholesaler(req.body.wholesaler).then((result:IPublicRequest) => {
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


wholesalersApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('wholesaler')){
        await new WholesalerServices().deleteWholesaler(req.body.wholesaler).then((result:IPublicRequest) => {
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

wholesalersApi.get('/getAll', async (req, res, next) => {
    await new WholesalerServices().getAllWholesaler().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



