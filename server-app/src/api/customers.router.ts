import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {CustomerServices} from "../services/customer.services";
import {CashServices} from "../services/cash.services";

export const customersApi = express.Router();


customersApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('customer')){
        await new CustomerServices().addCustomer(req.body.customer).then((result:IPublicRequest) => {
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




customersApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('customer')){
        await new CustomerServices().editCustomer(req.body.customer).then((result:IPublicRequest) => {
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


customersApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('customer')){
        await new CustomerServices().deleteCustomer(req.body.customer).then((result:IPublicRequest) => {
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

customersApi.get('/getAll', async (req, res, next) => {
    await new CustomerServices().getAllCustomer().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

customersApi.get('/getFullTitle', async (req, res, next) => {
    await new CustomerServices().getFullTitle().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});



