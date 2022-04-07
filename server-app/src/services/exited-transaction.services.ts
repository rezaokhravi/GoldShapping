import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {domain} from "../enum";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";
import {ExitedTransactionEntity} from "../entity/exited-transaction.entity";
import {IExitedTransaction} from "../models/exited-transaction.model";


export class ExitedTransactionServices {


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
    async addExitTransaction(exitTransaction: IExitedTransaction) {
        try {
            // @ts-ignore
            return new Promise<IPublicRequest>(async (resolve) => {

                    let ExitTransaction = new ExitedTransactionEntity();
                    const exitTransactionEntity = getRepository(ExitedTransactionEntity);

                    ExitTransaction.GOOD_ID = exitTransaction.GOOD_ID;
                    ExitTransaction.STORAGE_ID = exitTransaction.STORAGE_ID;
                    ExitTransaction.WEIGHT = exitTransaction.WEIGHT;
                    ExitTransaction.COUNT = exitTransaction.COUNT;
                    ExitTransaction.DESCRIPTION = exitTransaction.DESCRIPTION;
                    ExitTransaction.USE_ID_CREATOR = exitTransaction.USE_ID_CREATOR;
                    ExitTransaction.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    ExitTransaction.MODIFY_USE_ID = null;
                    ExitTransaction.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    exitTransactionEntity.find({
                        GOOD_ID: ExitTransaction.GOOD_ID,
                        STORAGE_ID: ExitTransaction.STORAGE_ID
                    })
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'کالا وارد شده تکراری می باشد!!!',
                                    enMessage: 'exitTransaction already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                exitTransactionEntity.save(ExitTransaction)
                                    .then((value: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [value],
                                            faMessage: 'عملیات با موفقیت انجام گردید.',
                                            enMessage: 'success'
                                        }
                                        resolve(this.requestResult);
                                    })
                                    .catch((error: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: false,
                                            data: [],
                                            faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                                            enMessage: error.message
                                        }
                                        resolve(this.requestResult);
                                    });
                            }
                        })
                        .catch((error: any) => {

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

    // @ts-ignore
    async editExitTransaction(exitTransaction: IExitedTransaction) {
        try {
            // @ts-ignore
            return new Promise<IPublicRequest>(async (resolve) => {

                    let ExitTransaction = new ExitedTransactionEntity();
                    const exitTransactionEntity = getRepository(ExitedTransactionEntity);

                    // @ts-ignore
                    exitTransactionEntity.findOne(exitTransaction.ID)
                        .then((res: any) => {
                            if (res) {

                                ExitTransaction = res;
                                ExitTransaction.GOOD_ID = exitTransaction.GOOD_ID;
                                ExitTransaction.STORAGE_ID = exitTransaction.STORAGE_ID;
                                ExitTransaction.WEIGHT = exitTransaction.WEIGHT;
                                ExitTransaction.COUNT = exitTransaction.COUNT;
                                ExitTransaction.DESCRIPTION = exitTransaction.DESCRIPTION;
                                ExitTransaction.MODIFY_USE_ID = null;
                                ExitTransaction.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                exitTransactionEntity.save(ExitTransaction)
                                    .then((value: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [value],
                                            faMessage: 'عملیات با موفقیت انجام گردید.',
                                            enMessage: 'success'
                                        }
                                        resolve(this.requestResult);
                                    })
                                    .catch((error: any) => {
                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: false,
                                            data: [],
                                            faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                                            enMessage: error.message
                                        }
                                        resolve(this.requestResult);
                                    });

                            } else {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `کالای درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists exitTransactionEntity in the current database'
                                }
                                resolve(this.requestResult);
                            }
                        })
                        .catch((error: any) => {

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


    // @ts-ignore
    async deleteExitTransaction(exitTransaction: IExitedTransaction) {
        try {

            return new Promise<IPublicRequest>(async (resolve) => {

                    const exitTransactionEntity = getRepository(ExitedTransactionEntity);

                    // @ts-ignore
                    exitTransactionEntity.findOne(exitTransaction.ID)
                        .then((res: any) => {
                            if (res) {
                                exitTransactionEntity.remove(res)
                                    .then((value: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [value],
                                            faMessage: 'عملیات با موفقیت انجام گردید.',
                                            enMessage: 'success'
                                        }
                                        resolve(this.requestResult);
                                    })
                                    .catch((error: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: false,
                                            data: [],
                                            faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                                            enMessage: error.message
                                        }
                                        resolve(this.requestResult);
                                    });
                            } else {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `کالای درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists exitTransactionEntity in the current database'
                                }
                                resolve(this.requestResult);
                            }
                        })
                        .catch((error: any) => {

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

    async getAllTransactionEntity() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const exitTransactionEntity = getRepository(ExitedTransactionEntity);

                    exitTransactionEntity.createQueryBuilder('et')
                        .select(['et.*', 'GOODS.title as GOOD_TITLE', 'STORAGE.TITLE as STORAGE_TITLE'])
                        .innerJoin('GOODS', 'GOODS', 'GOODS.id = et.id')
                        .innerJoin('STORAGE', 'STORAGE', 'STORAGE.id = et.id')
                        .orderBy('STORAGE.title', 'ASC')
                        .getRawMany()
                        .then((res) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: res,
                                    faMessage: `عملیات با موفقیت انجام گردید.`,
                                    enMessage: 'success'
                                }
                                resolve(this.requestResult);
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: [],
                                    faMessage: `رکوردی یافت نشد!!!`,
                                    enMessage: 'don\'t exists row in table'
                                }
                                resolve(this.requestResult);
                            }
                        })
                        .catch((error: any) => {

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
