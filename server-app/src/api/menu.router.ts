import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {MenuServices} from "../services/menu.services";
export const menuApi = express.Router();


menuApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('menu')){
        await new MenuServices().addMenu(req.body.menu).then((result:IPublicRequest) => {
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


menuApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('menu')){
        await new MenuServices().editMenu(req.body.menu).then((result:IPublicRequest) => {
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


menuApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('menu')){
        await new MenuServices().deleteMenu(req.body.menu).then((result:IPublicRequest) => {
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

menuApi.get('/getAll', async (req, res, next) => {
        await new MenuServices().getAllMenu().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});


menuApi.get('/getAllMenuTitle', async (req, res, next) => {

        await new MenuServices().getAllMenuTitle().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});

menuApi.post('/getAllMenuByUserId', async (req, res, next) => {

    if (req.body.hasOwnProperty('useId')){
        await new MenuServices().getAllMenuByUserId(req.body.useId).then((result:IPublicRequest) => {
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
