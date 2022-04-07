import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {WorkshopServices} from "../services/workshop.services";
export const workshopsApi = express.Router();


workshopsApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('workshop')){
        await new WorkshopServices().addWorkShop(req.body.workshop).then((result:IPublicRequest) => {
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



workshopsApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('workshop')){
        await new WorkshopServices().editWorkShop(req.body.workshop).then((result:IPublicRequest) => {
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


workshopsApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('workshop')){
        await new WorkshopServices().deleteWorkShop(req.body.workshop).then((result:IPublicRequest) => {
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

workshopsApi.get('/getAll', async (req, res, next) => {
    await new WorkshopServices().getAllWorkShop().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



