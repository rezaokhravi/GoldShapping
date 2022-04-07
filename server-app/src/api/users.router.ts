import express from 'express';
import {UserServices} from '../services/user.services';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
export const usersApi = express.Router();


usersApi.post('/create', async (req, res, next) => {

    if (req.body.hasOwnProperty('user')){
        await new UserServices().addUser(req.body.user).then((result:IPublicRequest) => {
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

usersApi.post('/upload', async (req, res)=>{
    if (req.hasOwnProperty('files')){
        // @ts-ignore
        await new UserServices().uploadFile(req.files.pictureFile,req.files.userId).then((result:IPublicRequest) => {
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

})

usersApi.post('/edit', async (req, res, next) => {

    if (req.body.hasOwnProperty('user')){
        await new UserServices().editUser(req.body.user).then((result:IPublicRequest) => {
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


usersApi.post('/delete', async (req, res, next) => {

    if (req.body.hasOwnProperty('user')){
        await new UserServices().deleteUser(req.body.user).then((result:IPublicRequest) => {
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

usersApi.get('/getAll', async (req, res, next) => {
        await new UserServices().getAllUser().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});

usersApi.post('/getUserById', async (req, res, next) => {
    if (req.body.hasOwnProperty('userId')){
        await new UserServices().getUserById(req.body.userId).then((result:IPublicRequest) => {
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

usersApi.post('/getImageUserById', async (req, res, next) => {
    if (req.body.hasOwnProperty('userId')){
        await new UserServices().getUserById(req.body.userId).then((result:IPublicRequest) => {
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

usersApi.get('/getUserFullName', async (req, res, next) => {
        await new UserServices().getUserFullName().then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        });
});
