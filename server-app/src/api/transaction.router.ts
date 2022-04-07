import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import { TransactionServices } from '../services/transaction.services';

export const transactionApi = express.Router();


transactionApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('transaction')){
        await new TransactionServices().insertTransaction(req.body.transaction).then((result:IPublicRequest) => {
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

transactionApi.post('/getTransactionById', async (req, res, next) => {

    if (req.body.hasOwnProperty('transactionId')){
        await new TransactionServices().getTransactionById(req.body.transactionId).then((result:IPublicRequest) => {
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

transactionApi.post('/getCountSettleByCustomerId', async (req, res, next) => {

    if (req.body.hasOwnProperty('customerId')){
        await new TransactionServices().getCountSettleByCustomerId(req.body.customerId).then((result:IPublicRequest) => {
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

transactionApi.get('/getOrderTitleAdvice', async (req, res, next) => {
        await new TransactionServices().getOrderTitleAdvice().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});

transactionApi.get('/getOrderTitleWorkShop', async (req, res, next) => {
        await new TransactionServices().getOrderTitleWorkShop().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});

transactionApi.get('/getStorageData', async (req, res, next) => {
    await new TransactionServices().getStorageData().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

transactionApi.post('/setStorageData', async (req, res, next) => {
    if (req.body.hasOwnProperty('storageData')){
        await new TransactionServices().setStorageData(req.body.storageData).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
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
