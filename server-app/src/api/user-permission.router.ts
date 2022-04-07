import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {UserPermissionServices} from "../services/user-permission.services";
export const userPermissionApi = express.Router();


userPermissionApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('userPermission')){
        await new UserPermissionServices().addUserPermission(req.body.userPermission).then((result:IPublicRequest) => {
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


userPermissionApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('userPermission')){
        await new UserPermissionServices().editUserPermission(req.body.userPermission).then((result:IPublicRequest) => {
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


userPermissionApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('userPermission')){
        await new UserPermissionServices().deleteUserPermission(req.body.userPermission).then((result:IPublicRequest) => {
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

userPermissionApi.get('/getAll', async (req, res, next) => {
        await new UserPermissionServices().getAllUserPermission().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});


userPermissionApi.post('/getAllPermissionByUserId', async (req, res, next) => {

    if (req.body.hasOwnProperty('userPermission')){
        await new UserPermissionServices().getAllPermissionByUserId(req.body.userPermission).then((result:IPublicRequest) => {
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
