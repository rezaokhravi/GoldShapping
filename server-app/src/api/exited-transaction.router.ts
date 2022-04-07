import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {ExitedTransactionServices} from "../services/exited-transaction.services";
export const exitedTransactionApi = express.Router();


exitedTransactionApi.post('/create', async (req, res, next) => {
    if (req.body.hasOwnProperty('exitTransaction')){
       await new ExitedTransactionServices().addExitTransaction(req.body.exitTransaction).then((result:IPublicRequest) => {
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



exitedTransactionApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('exitTransaction')){
        await new ExitedTransactionServices().editExitTransaction(req.body.exitTransaction).then((result:IPublicRequest) => {
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


exitedTransactionApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('exitTransaction')){
        await new ExitedTransactionServices().deleteExitTransaction(req.body.exitTransaction).then((result:IPublicRequest) => {
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

exitedTransactionApi.get('/getAll', async (req, res, next) => {
    await new ExitedTransactionServices().getAllTransactionEntity().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



