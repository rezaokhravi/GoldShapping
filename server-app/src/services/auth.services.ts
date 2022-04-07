
import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {ILogin, IUserLogin} from "../models/auth.model";
import {UsersEntity} from "../entity/users.entity";
import {encryptData} from "../utilites";
import {UserPermissionEntity} from "../entity/user-permission.entity";
import {createConnection, getConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class AuthServices {


    private requestResult: IPublicRequest;
    // @ts-ignore
    constructor() {
        this.requestResult = {
            status: 200,
            isSuccess: false,
            data: [],
            faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
            enMessage: 'error'
        };
    }

    // @ts-ignore
    async login(auth: ILogin) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                                const usersEntity = getRepository(UsersEntity);
                                usersEntity.createQueryBuilder('users')
                                    .select(['users.NAME as NAME', 'users.FAMILY as FAMILY', 'users.ID as ID', 'users.EMAIL as EMAIL', 'users.MOBILE as MOBILE'])
                                    .where('users.[USER_NAME]=:users and users.PASSWORD=:password', {
                                        users: auth.USER,
                                        password: auth.PASSWORD
                                    })
                                    .getRawMany()
                                    .then( async (userRes: any) => {

                                        if (userRes.length > 0) {
                                            if (userRes.length > 0) {
                                                let auth: IUserLogin = {
                                                    ID: userRes[0].ID,
                                                    NAME: userRes[0].NAME,
                                                    FAMILY: userRes[0].FAMILY,
                                                    EMAIL: userRes[0].EMAIL,
                                                    MOBILE: userRes[0].MOBILE,
                                                    PERMISSIONS: [],
                                                    EXPIRE_TOKEN_DATE: moment()
                                                        .add(1, 'day')
                                                        .locale('fa')
                                                        .format('jYYYY/jMM/jDD')
                                                };
                                                let token = encryptData(auth);

                                                this.requestResult = {
                                                    status: 200,
                                                    isSuccess: true,
                                                    data: [{TOKEN: token}],
                                                    faMessage: 'عملیات با موفقیت انجام گردید.',
                                                    enMessage: 'success'
                                                }
                                                resolve(this.requestResult);
                                            }
                                        } else {

                                            this.requestResult = {
                                                status: 200,
                                                isSuccess: false,
                                                data: [],
                                                faMessage: 'نام کاربری یا رمز عبور اشتباه است!!!',
                                                enMessage: 'user or password not found'
                                            }
                                            resolve(this.requestResult);
                                        }
                                    })
                                    .catch(async (error: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: false,
                                            data: [],
                                            faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                                            enMessage: error.message
                                        };
                                        resolve(this.requestResult);
                                    });

                }
            );
        } catch (error: any) {
            // @ts-ignore
            return this.requestResult = {
                status: 200,
                isSuccess: false,
                data: [],
                faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                enMessage: error.message
            };
        }
    }

}
