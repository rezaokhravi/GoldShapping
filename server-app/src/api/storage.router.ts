import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {StorageServices} from "../services/storage.services";

export const storageApi = express.Router();


storageApi.post('/create', async (req, res, next) => {
    if (req.body.hasOwnProperty('storage')){
       await new StorageServices().addStorage(req.body.storage).then((result:IPublicRequest) => {
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



storageApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('storage')){
        await new StorageServices().editStorage(req.body.storage).then((result:IPublicRequest) => {
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


storageApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('storage')){
        await new StorageServices().deleteStorage(req.body.storage).then((result:IPublicRequest) => {
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

storageApi.get('/getAll', async (req, res, next) => {
    await new StorageServices().getAllStorage().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});


storageApi.get('/getStorageTitle', async (req, res, next) => {
    await new StorageServices().getStorageTitle().then((result:IPublicRequest) => {
        res.status(result.status).json(result);
    });
});

