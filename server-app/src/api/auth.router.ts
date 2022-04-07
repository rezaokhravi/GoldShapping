import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import { AuthServices } from '../services/auth.services';

export const authApi = express.Router();


authApi.post('/login', async (req, res, next) => {

    if (req.body.hasOwnProperty('user')){
        await new AuthServices().login(req.body.user).then((result:IPublicRequest) => {
            res.status(result.status).json(result);
        })
    }else{
        const result :IPublicRequest={
            isSuccess:false,
            status:200,
            data:[],
            faMessage:'اطلاعاتی جهت ورود ارسال نشده است !!!',
            enMessage:'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});




