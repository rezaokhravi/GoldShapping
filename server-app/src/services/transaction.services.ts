import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {ITransaction} from "../models/transactions.model";
import {TransactionsEntity} from "../entity/transactions.entity";
import {getManager, getRepository} from "typeorm";
import {ormConfig} from "../config/db";
import {UserPermissionEntity} from "../entity/user-permission.entity";
import {domain, enExchangeType} from "../enum";
import fs from "fs";
import path from 'path';

export class TransactionServices {

    // @ts-ignore
    private requestResult: IPublicRequest = null;

    constructor() {
        this.requestResult = {
            status: 500,
            isSuccess: false,
            data: [],
            faMessage: '',
            enMessage: ''
        };
    }


    async addTransaction(transaction: ITransaction) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Transaction = new TransactionsEntity();

                    Transaction.DOM_ID_ACCOUNT_TYPE = transaction.DOM_ID_ACCOUNT_TYPE;
                    Transaction.DOM_ID_ORDER_TYPE = transaction.DOM_ID_ORDER_TYPE;
                    Transaction.DOM_ID_EXCHANGE_TYPE = transaction.DOM_ID_EXCHANGE_TYPE;
                    Transaction.DOM_ID_GOLD_ACCOUNT_TYPE = transaction.DOM_ID_GOLD_ACCOUNT_TYPE;
                    Transaction.DOM_ID_GOLD_TYPE = transaction.DOM_ID_GOLD_TYPE;
                    Transaction.DOM_ID_ORDER_GEM_TYPE = transaction.DOM_ID_ORDER_GEM_TYPE;
                    Transaction.ACCOUNT_RESIDUAL = transaction.ACCOUNT_RESIDUAL;
                    Transaction.COUNT = transaction.COUNT;
                    Transaction.CUSTOMER_ID = transaction.CUSTOMER_ID;
                    Transaction.GOOD_ID = transaction.GOOD_ID;
                    Transaction.GRAM_PRICE = transaction.GRAM_PRICE;
                    Transaction.GRAM_WEIGHT = transaction.GRAM_WEIGHT;
                    Transaction.MESGHAL_PRICE = transaction.MESGHAL_PRICE;
                    Transaction.MESGHAL_WEIGHT = transaction.MESGHAL_WEIGHT;
                    Transaction.ORDER_CODE = transaction.ORDER_CODE;
                    Transaction.ORDER_MODEL = transaction.ORDER_MODEL;
                    Transaction.ORDER_SIZE = transaction.ORDER_SIZE;
                    Transaction.ORDER_GEM_WEIGHT = transaction.ORDER_GEM_WEIGHT;
                    Transaction.ORDER_DATE = transaction.ORDER_DATE;
                    Transaction.ORDER_ID = transaction.ORDER_ID;
                    Transaction.MANUAL_TOTAL_AMOUNT = transaction.MANUAL_TOTAL_AMOUNT;
                    Transaction.RECEIVED_STATEMENT = transaction.RECEIVED_STATEMENT;
                    Transaction.ROVER = transaction.ROVER;
                    Transaction.ROVER_WEIGHT_18 = transaction.ROVER_WEIGHT_18;
                    Transaction.SETTLEMENT_DATE = transaction.SETTLEMENT_DATE;
                    Transaction.STORAGE_ID = transaction.STORAGE_ID;
                    Transaction.TOTAL_AMOUNT = transaction.TOTAL_AMOUNT;
                    Transaction.WATER_UNDER = transaction.WATER_UNDER;
                    Transaction.WORK_WEIGHT = transaction.WORK_WEIGHT;
                    Transaction.GOLD_WEIGHT = transaction.GOLD_WEIGHT;
                    Transaction.GOLD_BOXER = transaction.GOLD_BOXER;
                    Transaction.DIFFERENT_WEIGHT = transaction.DIFFERENT_WEIGHT;
                    Transaction.PROFIT = transaction.PROFIT;
                    Transaction.PAY = transaction.PAY;
                    Transaction.TAX = transaction.TAX;

                    Transaction.DESCRIPTION = transaction.DESCRIPTION;
                    Transaction.USE_ID_CREATOR = transaction.USE_ID_CREATOR;
                    Transaction.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Transaction.MODIFY_USE_ID = null;
                    Transaction.MODIFY_DATE_TIME = null;

                    const transactionEntity = getRepository(TransactionsEntity);

                    // @ts-ignore
                    transactionEntity.find({ID: transaction.ID})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'تراکنش وارد شده تکراری می باشد!!!',
                                    enMessage: 'transaction already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                transactionEntity.save(Transaction)
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
            return this.requestResult = {
                status: 200,
                isSuccess: false,
                data: [],
                faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                enMessage: error.message
            };
        }
    }

    async getTransactionById(transactionId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const transactionsEntity = getRepository(TransactionsEntity);
                    // @ts-ignore
                    transactionsEntity
                        .createQueryBuilder('')
                        .select(['*'])
                        .where('ID = :transactionId', {transactionId: transactionId})
                        .getRawMany()
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: res,
                                    faMessage: 'عملیات با موفقیت انجام گردید.',
                                    enMessage: 'success'
                                }
                                resolve(this.requestResult);
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `تبادل درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists Transaction in the current database'
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

    async getCountSettleByCustomerId(customerId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const transactionsEntity = getRepository(TransactionsEntity);
                    // @ts-ignore
                    transactionsEntity
                        .createQueryBuilder('')
                        .select(['COUNT(ID) as CNT'])
                        .where('CUSTOMER_ID=:customerId and ISNULL(IS_SETTLE,0) = 0', {customerId: customerId})
                        .getRawMany()
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: res,
                                    faMessage: 'عملیات با موفقیت انجام گردید.',
                                    enMessage: 'success'
                                }
                                resolve(this.requestResult);
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `تبادل درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists Transaction in the current database'
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

    async insertTransaction(transaction: ITransaction) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    transaction.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    //transaction.MODIFY_USE_ID = null;
                    // transaction.MODIFY_DATE_TIME = null;

                    const connection = getManager();
                    connection
                        .query(`EXEC Sp_InsertTransaction @ID=${transaction.ID || null} ,@DOM_ID_ACCOUNT_TYPE = ${transaction.DOM_ID_ACCOUNT_TYPE || null},@DOM_ID_ORDER_TYPE = ${transaction.DOM_ID_ORDER_TYPE || null},@DOM_ID_EXCHANGE_TYPE = ${transaction.DOM_ID_EXCHANGE_TYPE || null},@DOM_ID_GOLD_ACCOUNT_TYPE = ${transaction.DOM_ID_GOLD_ACCOUNT_TYPE || null},@DOM_ID_GOLD_TYPE = ${transaction.DOM_ID_GOLD_TYPE || null},@DOM_ID_ORDER_GEM_TYPE = ${transaction.DOM_ID_ORDER_GEM_TYPE || null},@ACCOUNT_RESIDUAL = ${transaction.ACCOUNT_RESIDUAL || null},@COUNT = ${transaction.COUNT || null},@CUSTOMER_ID = ${transaction.CUSTOMER_ID || null},@GOOD_ID = ${transaction.GOOD_ID || null},@GRAM_PRICE = ${transaction.GRAM_PRICE || null},@GRAM_WEIGHT = ${transaction.GRAM_WEIGHT || null},@MESGHAL_PRICE = ${transaction.MESGHAL_PRICE || null},@MESGHAL_WEIGHT = ${transaction.MESGHAL_WEIGHT || null},@ORDER_CODE = ${transaction.ORDER_CODE || null},@ORDER_MODEL = ${transaction.ORDER_MODEL || null},@ORDER_SIZE = ${transaction.ORDER_SIZE || null},@ORDER_GEM_WEIGHT = ${transaction.ORDER_GEM_WEIGHT || null},@ORDER_DATE = '${transaction.ORDER_DATE || ''}',@ORDER_ID = ${transaction.ORDER_ID || null},@MANUAL_TOTAL_AMOUNT = ${transaction.MANUAL_TOTAL_AMOUNT || null},@RECEIVED_STATEMENT = ${transaction.RECEIVED_STATEMENT || null},@ROVER = ${transaction.ROVER || null},@ROVER_WEIGHT_18 = ${transaction.ROVER_WEIGHT_18 || null},@SETTLEMENT_DATE = '${transaction.SETTLEMENT_DATE || ''}',@STORAGE_ID = ${transaction.STORAGE_ID || null},@WATER_UNDER = ${transaction.WATER_UNDER || null},@WORK_WEIGHT = ${transaction.WORK_WEIGHT || null},@GOLD_WEIGHT = ${transaction.GOLD_WEIGHT || null},@GOLD_BOXER = ${transaction.GOLD_BOXER || null},@GOLD_PRICE = ${transaction.GOLD_PRICE || null},@DIFFERENT_WEIGHT = ${transaction.DIFFERENT_WEIGHT || null},@PROFIT = ${transaction.PROFIT || null},@PAY = ${transaction.PAY || null},@TAX = ${transaction.TAX || null},@DESCRIPTION = '${transaction.DESCRIPTION || ''}',@USE_ID_CREATOR = ${transaction.USE_ID_CREATOR || null},@CREATE_DATE_TIME = ${transaction.CREATE_DATE_TIME || null},@MODIFY_USE_ID = ${transaction.MODIFY_USE_ID || null},@MODIFY_DATE_TIME = ${transaction.MODIFY_DATE_TIME || null},@TOTAL_AMOUNT = ${transaction.TOTAL_AMOUNT || null},@R_TAX = ${transaction.R_TAX || null},@R_PROFIT = ${transaction.R_PROFIT || null},@R_PAY = ${transaction.R_PAY || null},@R_TOTAL_AMOUNT = ${transaction.R_TOTAL_AMOUNT || null}`)
                        .then(async res => {
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
                        .catch(async error => {
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

    async getOrderTitleAdvice() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const transactionsEntity = getRepository(TransactionsEntity);
                    // @ts-ignore
                    transactionsEntity
                        .createQueryBuilder('te')
                        .select(['te.*', `CONCAT(ORDER_CODE,' - ',CUSTOMERS.NAME,' ',CUSTOMERS.FAMILY,' - ',ISNULL(GOODS.TITLE,DOMAINS.TITLE)) as Full_TITLE`])
                        .innerJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = te.CUSTOMER_ID')
                        .leftJoin('GOODS', 'GOODS', 'GOODS.ID = te.GOOD_ID')
                        .leftJoin('DOMAINS', 'DOMAINS', 'DOMAINS.DOM_ID=:DomId and DOMAINS.ID = te.DOM_ID_GOLD_ACCOUNT_TYPE', {DomId: domain.GoldAccountType})
                        .where('DOM_ID_EXCHANGE_TYPE = :DomExchangeType And ISNULL(IS_SETTLE,0)=0', {DomExchangeType: enExchangeType.advice})
                        .getRawMany()
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: res,
                                    faMessage: 'عملیات با موفقیت انجام گردید.',
                                    enMessage: 'success'
                                }
                                resolve(this.requestResult);
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: [],
                                    faMessage: `تبادل درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists Transaction in the current database'
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

    async getOrderTitleWorkShop() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const transactionsEntity = getRepository(TransactionsEntity);
                    // @ts-ignore
                    transactionsEntity
                        .createQueryBuilder('te')
                        .select(['te.*', `CONCAT(ORDER_CODE,' - ',case when ISNULL(CUSTOMERS.ID,0)=0 then DomGoldType.TITLE else  CUSTOMERS.NAME + ' ' + CUSTOMERS.FAMILY end,' - ',ISNULL(GOODS.TITLE,DomGoldAccountType.TITLE)) as Full_TITLE`])
                        .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = te.CUSTOMER_ID')
                        .leftJoin('GOODS', 'GOODS', 'GOODS.ID = te.GOOD_ID')
                        .leftJoin('DOMAINS', 'DomGoldAccountType', 'DomGoldAccountType.DOM_ID=:DomIdGoldAccountType and DomGoldAccountType.ID = te.DOM_ID_GOLD_ACCOUNT_TYPE', {DomIdGoldAccountType: domain.GoldAccountType})
                        .leftJoin('DOMAINS', 'DomGoldType', 'DomGoldType.DOM_ID=:DomIdGoldType and DomGoldType.ID = te.DOM_ID_GOLD_TYPE', {DomIdGoldType: domain.GoldType})
                        .where('DOM_ID_EXCHANGE_TYPE = :DomExchangeType And ISNULL(IS_SETTLE,0)=0', {DomExchangeType: enExchangeType.deliver})
                        .getRawMany()
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: res,
                                    faMessage: 'عملیات با موفقیت انجام گردید.',
                                    enMessage: 'success'
                                }
                                resolve(this.requestResult);
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: true,
                                    data: [],
                                    faMessage: `تبادل درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists Transaction in the current database'
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

    async getStorageData() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let filePath = path.join(__dirname, '/../data/storage','storageData.json');
                console.log(filePath);
                await fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    // @ts-ignore
                    let student = JSON.parse(data);
                    if (student) {
                        this.requestResult = {
                            status: 200,
                            isSuccess: true,
                            data: [student],
                            faMessage: 'عملیات با موفقیت انجام گردید.',
                            enMessage: 'success'
                        }
                        resolve(this.requestResult);
                    } else {
                        this.requestResult = {
                            status: 200,
                            isSuccess: true,
                            data: [],
                            faMessage: `ذخیره داده شده یافت نشد!!!`,
                            enMessage: 'don\'t exists storageDate in the server'
                        }
                        resolve(this.requestResult);
                    }
                });
            });


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

    async setStorageData(data: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {
                let filePath = path.join(__dirname, '/../data/storage','storageData.json');
                let storageData = JSON.stringify(data);
                console.log(filePath)
                await fs.writeFile(filePath, storageData,() => {
                    this.requestResult = {
                        status: 200,
                        isSuccess: true,
                        data: [],
                        faMessage: 'عملیات با موفقیت انجام گردید.',
                        enMessage: 'success'
                    }
                    resolve(this.requestResult);
                });
            });

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
