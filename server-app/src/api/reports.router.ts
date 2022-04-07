import express from 'express';
import {IPublicRequest} from "../models/request.model";
import joi from 'joi'
import {ReportServices} from "../services/report.services";
import {applyQueryParameters, decryptData, encryptData} from "../utilites";
import MSSQLAdapter from "../config/MSSQLAdapter";
import path from "path";

export const reportsApi = express.Router();


reportsApi.post('/getGoldCardReport', async (req, res, next) => {

    if (req.body.hasOwnProperty('report')) {
        await new ReportServices().getGoldCardReport(req.body.report).then((result: IPublicRequest) => {
            res.status(result.status).json(result);
        })
    } else {
        const result: IPublicRequest = {
            isSuccess: false,
            status: 200,
            data: [],
            faMessage: 'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage: 'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

reportsApi.post('/getCustomerReport', async (req, res, next) => {

    if (req.body.hasOwnProperty('report')) {
        await new ReportServices().getCustomerReport(req.body.report).then((result: IPublicRequest) => {
            res.status(result.status).json(result);
        })
    } else {
        const result: IPublicRequest = {
            isSuccess: false,
            status: 200,
            data: [],
            faMessage: 'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage: 'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

reportsApi.post('/getWholesalerReport', async (req, res, next) => {

    if (req.body.hasOwnProperty('report')) {
        await new ReportServices().getWholesalerReport(req.body.report).then((result: IPublicRequest) => {
            res.status(result.status).json(result);
        })
    } else {
        const result: IPublicRequest = {
            isSuccess: false,
            status: 200,
            data: [],
            faMessage: 'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage: 'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

reportsApi.post('/getWorkshopReport', async (req, res, next) => {

    if (req.body.hasOwnProperty('report')) {
        await new ReportServices().getWorkshopReport(req.body.report).then((result: IPublicRequest) => {
            res.status(result.status).json(result);
        })
    } else {
        const result: IPublicRequest = {
            isSuccess: false,
            status: 200,
            data: [],
            faMessage: 'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage: 'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

reportsApi.post('/getTransactionReport', async (req, res, next) => {

    if (req.body.hasOwnProperty('report')) {
        await new ReportServices().getTransactionReport(req.body.report).then((result: IPublicRequest) => {
            res.status(result.status).json(result);
        })
    } else {
        const result: IPublicRequest = {
            isSuccess: false,
            status: 200,
            data: [],
            faMessage: 'اطلاعاتی جهت ذخیره ارسال نشده است !!!',
            enMessage: 'don\'t have data!!!'
        }
        res.status(result.status).json(result);
    }
});

reportsApi.post('/dataset', async (req, res, next) => {

    let data = "";
    req.on('data', function (buffer) {
        data += buffer;
    });
    req.on('end', function () {
        if (data.indexOf("{") != 0) {
            data = Buffer.from(data.replace(/[A-Za-z]/g, function (c) {
                return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= "M" ? 13 : -13));
            }), "base64").toString("ascii");

        }

        let command = JSON.parse(data.toString());
        const cnn = decryptData(command.connectionString);
        command.connectionString = cnn;
        command.queryString = applyQueryParameters(command.queryString, command.parameters, command.escapeQueryParameters);
        if (command.database == "MS SQL") {
            MSSQLAdapter.process(command,function (result: any) {
                res.end(JSON.stringify(result));
            });
        }
        else res.end(JSON.stringify({success: false, notice: "Database '" + command.database + "' not supported!"}));
    });
});

reportsApi.get('/factor', async (req, res, next) => {
        res.header("Content-Type",'application/json');
        res.sendFile(path.resolve('assets/reports/rpt2.mrt'));
});


