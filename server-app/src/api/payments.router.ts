import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {PaymentServices} from "../services/payment.services";

export const paymentApi = express.Router();


paymentApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('payment')){
        await new PaymentServices().addPayment(req.body.payment).then((result:IPublicRequest) => {
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



paymentApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('payment')){
        await new PaymentServices().editPayment(req.body.payment).then((result:IPublicRequest) => {
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


paymentApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('payment')){
        await new PaymentServices().deletePayment(req.body.payment).then((result:IPublicRequest) => {
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

paymentApi.post('/getPaymentByTransactionId', async (req, res, next) => {

    if (req.body.hasOwnProperty('transactionId')){
        await new PaymentServices().getPaymentByTransactionId(req.body.transactionId).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت نمایش ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

paymentApi.get('/getAll', async (req, res, next) => {
    await new PaymentServices().getAllPayment().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



paymentApi.post('/getFnAccountResidual', async (req, res, next) => {

    if (req.body.hasOwnProperty('transactionId') && req.body.hasOwnProperty('customerId')){
        await new PaymentServices().getFnAccountResidual(req.body.transactionId,req.body.customerId).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت نمایش ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});


