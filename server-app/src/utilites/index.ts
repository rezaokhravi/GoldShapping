// @ts-ignore
import * as CryptoJS from 'crypto-js';
import fs from "fs";
import path from "path";
import {config} from "../config";
import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {UserServices} from "../services/user.services";


export async function applyQueryParameters(baseSqlCommand: any, parameters: any, escapeQueryParameters: any) {
    if (baseSqlCommand == null || baseSqlCommand.indexOf("@") < 0) return baseSqlCommand;

    let result = "";
    while (baseSqlCommand.indexOf("@") >= 0 && parameters != null) {
        result += baseSqlCommand.substring(0, baseSqlCommand.indexOf("@"));
        baseSqlCommand = baseSqlCommand.substring(baseSqlCommand.indexOf("@") + 1);

        let parameterName = "";

        while (baseSqlCommand.length > 0) {
            let char = baseSqlCommand.charAt(0);
            if (char.length === 1 && char.match(/[a-zA-Z0-9_-]/i)) {
                parameterName += char;
                baseSqlCommand = baseSqlCommand.substring(1);
            } else break;
        }

        let parameter = parameters.find((parameter: any) => parameter.name.toLowerCase() == parameterName.toLowerCase());
        if (parameter) {
            if (parameter.typeGroup != "number") {
                if (escapeQueryParameters)
                    result += "'" + parameter.value.toString().replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\"/gi, "\\\"") + "'";
                else
                    result += "'" + parameter.value.toString() + "'";
            } else
                result += parameter.value.toString();
        } else
            result += "@" + parameterName;
    }

    return result;
}

export async function loadSqlQueries(folderName: string) {
    // determine the file path for the folder
    return new Promise<any>(async (resolve, reject) => {
        const filePath = path.join(process.cwd(), "src", "data", folderName);
        let files: string[] = [];

        // get a list of all the files in the folder
        await fs.readdir(filePath, ((err, data) => {
            if (err) throw err;
            files = data;
            const sqlFiles = files.filter(f => f.endsWith(".sql"));

            // loop over the files and read in their contents
            const queries: any = {};
            for (let i = 0; i < sqlFiles.length; i++) {
                const query = fs.readFileSync(path.join(filePath, sqlFiles[i]), {encoding: "utf-8"});

                queries[sqlFiles[i].replace(".sql", "")] = query;
            }
            resolve(queries);
        }));
    });
}

export function encryptData(data: any) {
    try {
        let result: string = CryptoJS.AES.encrypt(JSON.stringify(data), config.env.secretKey).toString();
        return result;
    } catch (e) {
    }
}

export function decryptData(data: any) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, config.env.secretKey);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    } catch (e) {
    }
}

export function checkToken(req: any, res: any, next: any) {
    let result: IPublicRequest = {
        isSuccess: false,
        status: 401,
        data: [],
        faMessage: 'مجدد لاگین فرمائید!!!',
        enMessage: 'Unauthorized Access to site'
    }

    if (req.originalUrl === '/api/auth/login') {
        next();
    } else {
        let token = req.headers['token'];
        if (token) {
            token = decryptData(token);
            console.log('token:::', token);

            if (token.hasOwnProperty('EXPIRE_TOKEN_DATE')) {

                let currentDate = moment()
                    .locale('fa')
                    .format('jYYYY/jMM/jDD');

                if (token.EXPIRE_TOKEN_DATE >= currentDate) {
                    if (token.hasOwnProperty('ID')) {
                        new UserServices().getUserById(token.ID).then(rest => {
                            if (rest.isSuccess) {
                                if (rest.data[0].IS_ACTIVE) {
                                    next();
                                } else {
                                    result.faMessage = 'نام کاربری شما غیر فعال می باشد!!!';
                                    result.enMessage = 'Unauthorized Access to site';
                                    res.status(result.status).json(result);
                                }
                            } else {
                                result.faMessage = 'نام کاربری شما در سامانه موجود نیست!!!';
                                result.enMessage = 'Unauthorized Access to site';
                                res.status(result.status).json(result);
                            }
                        })
                    } else {
                        result.faMessage = 'عدم اعتبار شناسه ورودی به سامانه!!!';
                        result.enMessage = 'Unauthorized Access to site';
                        res.status(result.status).json(result);

                    }
                } else {
                    result.faMessage = 'تاریخ انقضاء شما به اتمام رسیده مجدد لاگین کنید!!!';
                    result.enMessage = 'Expire date to access site';
                    res.status(result.status).json(result);

                }
            } else {
                result.faMessage = 'مجدد ععلاگین فرمائید!!!';
                result.enMessage = 'Unauthorized Access to site';
                res.status(result.status).json(result);

            }
        } else {
            result.faMessage = 'عدم وجود شناسه ورودی به سامانه!!!';
            result.enMessage = 'Unauthorized Access to site';
            res.status(result.status).json(result);

        }

    }
}

