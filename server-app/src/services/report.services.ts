import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {TransactionsEntity} from "../entity/transactions.entity";
import {domain, enAccountType} from "../enum";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";


export class ReportServices {

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

    async getGoldCardReport(report: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let condition: string = '1=1';
                condition += report?.customerId ? ` and CUSTOMERS.ID = ${report.customerId}` : ``;
                condition += report?.fromDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') >= '${report.fromDates}_00 :00:00'` : ``;
                condition += report?.toDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') <= '${report.toDates}_99:99:99'` : ``;
                condition += report?.fromPrice ? ` and TRANSACTIONS.TOTAL_AMOUNT >= ${report.fromPrice}` : ``;
                condition += report?.toPrice ? ` and TRANSACTIONS.TOTAL_AMOUNT <= ${report.toPrice}` : ``;
                condition += report?.goldAccountType ? ` and DOM_GOLD_ACCOUNT.ID = ${report.goldAccountType}` : ``;
                condition += report?.customerCode ? ` and CUSTOMERS.CODE = '${report.customerCode}'` : ``;


                const transactionsEntity = getRepository(TransactionsEntity);
                // @ts-ignore
                transactionsEntity.createQueryBuilder('TRANSACTIONS')
                    .select(['TRANSACTIONS.*',
                        'CUSTOMERS.CODE as CUSTOMERS_CODE',
                        `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        'GOODS.TITLE AS GOOD_TITLE',
                        'STORAGE.TITLE AS STORAGE_TITLE',
                        'DOM_EXCHANGE_TYPE.TITLE AS DOM_EXCHANGE_TYPE_TITLE',
                        'DOM_GOLD_ACCOUNT.TITLE AS DOM_GOLD_ACCOUNT_TITLE',
                        'DOM_ORDER_TYPE.TITLE AS DOM_ORDER_TYPE_TITLE',
                        'DOM_ORDER_MODEL.TITLE AS DOM_ORDER_MODEL_TITLE',
                        'DOM_ORDER_GEM_TYPE.TITLE AS DOM_ORDER_GEM_TYPE_TITLE',
                        'DOM_GOLD_TYPE.TITLE AS DOM_GOLD_TYPE_TITLE',

                    ])
                    .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = TRANSACTIONS.CUSTOMER_ID')
                    .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                    .leftJoin('STORAGE', 'STORAGE', 'STORAGE.ID = TRANSACTIONS.STORAGE_ID')
                    .leftJoin('DOMAINS', 'DOM_EXCHANGE_TYPE', 'DOM_EXCHANGE_TYPE.DOM_ID = :DOM_EXCHANGE_TYPE AND DOM_EXCHANGE_TYPE.ID = TRANSACTIONS.DOM_ID_EXCHANGE_TYPE', {DOM_EXCHANGE_TYPE: domain.ExchangeType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_ACCOUNT', 'DOM_GOLD_ACCOUNT.DOM_ID = :DOM_GOLD_ACCOUNT AND DOM_GOLD_ACCOUNT.ID = TRANSACTIONS.DOM_ID_GOLD_ACCOUNT_TYPE', {DOM_GOLD_ACCOUNT: domain.GoldAccountType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_TYPE', 'DOM_ORDER_TYPE.DOM_ID = :DOM_ORDER_TYPE AND DOM_ORDER_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_TYPE', {DOM_ORDER_TYPE: domain.OrderType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_MODEL', 'DOM_ORDER_MODEL.DOM_ID = :DOM_ORDER_MODEL AND DOM_ORDER_MODEL.ID = TRANSACTIONS.ORDER_MODEL', {DOM_ORDER_MODEL: domain.OrderModel})
                    .leftJoin('DOMAINS', 'DOM_ORDER_GEM_TYPE', 'DOM_ORDER_GEM_TYPE.DOM_ID = :DOM_ORDER_GEM_TYPE AND DOM_ORDER_GEM_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_GEM_TYPE', {DOM_ORDER_GEM_TYPE: domain.GemType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_TYPE', 'DOM_GOLD_TYPE.DOM_ID = :DOM_GOLD_TYPE AND DOM_GOLD_TYPE.ID = TRANSACTIONS.DOM_ID_GOLD_TYPE', {DOM_GOLD_TYPE: domain.GoldType})
                    .where(condition)
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
                                isSuccess: false,
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

    async getCustomerReport(report: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let condition: string = `1=1 and TRANSACTIONS.DOM_ID_ACCOUNT_TYPE = ${enAccountType.exchange}`;
                condition += report?.exchangeType ? ` and DOM_EXCHANGE_TYPE.id=${report.exchangeType}` : ``;
                condition += report?.storageId ? ` and STORAGE.id=${report.storageId}` : ``;
                condition += report?.goodId ? ` and GOODS.id=${report.goodId}` : ``;
                condition += report?.customerId ? ` and CUSTOMERS.id=${report.customerId}` : ``;
                condition += report?.fromDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') >= '${report.fromDates}_00:00:00'` : ``;
                condition += report?.toDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') <= '${report.toDates}_99:99:99'` : ``;

                const transactionsEntity = getRepository(TransactionsEntity);
                // @ts-ignore
                transactionsEntity.createQueryBuilder('TRANSACTIONS')
                    .select(['TRANSACTIONS.*',
                        `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        'GOODS.TITLE AS GOOD_TITLE',
                        'STORAGE.TITLE AS STORAGE_TITLE',
                        'DOM_EXCHANGE_TYPE.TITLE AS DOM_EXCHANGE_TYPE_TITLE',
                        'DOM_GOLD_ACCOUNT.TITLE AS DOM_GOLD_ACCOUNT_TITLE',
                        'DOM_ORDER_TYPE.TITLE AS DOM_ORDER_TYPE_TITLE',
                        'DOM_ORDER_MODEL.TITLE AS DOM_ORDER_MODEL_TITLE',
                        'DOM_ORDER_GEM_TYPE.TITLE AS DOM_ORDER_GEM_TYPE_TITLE',
                        'DOM_GOLD_TYPE.TITLE AS DOM_GOLD_TYPE_TITLE',
                        'case when ISNULL(minT.ID,0)=0 then 0 else 1 end as SHOW_BTN_PAYMENT',
                    ])
                    .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = TRANSACTIONS.CUSTOMER_ID')
                    .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                    .leftJoin('STORAGE', 'STORAGE', 'STORAGE.ID = TRANSACTIONS.STORAGE_ID')
                    .leftJoin('DOMAINS', 'DOM_EXCHANGE_TYPE', 'DOM_EXCHANGE_TYPE.DOM_ID = :DOM_EXCHANGE_TYPE AND DOM_EXCHANGE_TYPE.ID = TRANSACTIONS.DOM_ID_EXCHANGE_TYPE', {DOM_EXCHANGE_TYPE: domain.ExchangeType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_ACCOUNT', 'DOM_GOLD_ACCOUNT.DOM_ID = :DOM_GOLD_ACCOUNT AND DOM_GOLD_ACCOUNT.ID = TRANSACTIONS.DOM_ID_GOLD_ACCOUNT_TYPE', {DOM_GOLD_ACCOUNT: domain.GoldAccountType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_TYPE', 'DOM_ORDER_TYPE.DOM_ID = :DOM_ORDER_TYPE AND DOM_ORDER_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_TYPE', {DOM_ORDER_TYPE: domain.OrderType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_MODEL', 'DOM_ORDER_MODEL.DOM_ID = :DOM_ORDER_MODEL AND DOM_ORDER_MODEL.ID = TRANSACTIONS.ORDER_MODEL', {DOM_ORDER_MODEL: domain.OrderModel})
                    .leftJoin('DOMAINS', 'DOM_ORDER_GEM_TYPE', 'DOM_ORDER_GEM_TYPE.DOM_ID = :DOM_ORDER_GEM_TYPE AND DOM_ORDER_GEM_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_GEM_TYPE', {DOM_ORDER_GEM_TYPE: domain.GemType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_TYPE', 'DOM_GOLD_TYPE.DOM_ID = :DOM_GOLD_TYPE AND DOM_GOLD_TYPE.ID = TRANSACTIONS.DOM_ID_GOLD_TYPE', {DOM_GOLD_TYPE: domain.GoldType})
                    .leftJoin('VW_FirstTransaction', 'minT', 'minT.CUSTOMER_ID = TRANSACTIONS.CUSTOMER_ID and minT.ID =TRANSACTIONS.ID ')
                    .where(condition)
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
                                isSuccess: false,
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

    async getWholesalerReport(report: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let condition: string = `1=1 and TRANSACTIONS.DOM_ID_ACCOUNT_TYPE = ${enAccountType.wholesaler}`;
                condition += report?.exchangeType ? ` and DOM_EXCHANGE_TYPE.id=${report.exchangeType}` : ``;
                condition += report?.storageId ? ` and STORAGE.id=${report.storageId}` : ``;
                condition += report?.goodId ? ` and GOODS.id=${report.goodId}` : ``;

                const transactionsEntity = getRepository(TransactionsEntity);
                // @ts-ignore
                transactionsEntity.createQueryBuilder('TRANSACTIONS')
                    .select(['TRANSACTIONS.*',
                        `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        'GOODS.TITLE AS GOOD_TITLE',
                        'STORAGE.TITLE AS STORAGE_TITLE',
                        'DOM_EXCHANGE_TYPE.TITLE AS DOM_EXCHANGE_TYPE_TITLE',
                        'DOM_GOLD_TYPE.TITLE AS DOM_GOLD_TYPE_TITLE',
                    ])
                    .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = TRANSACTIONS.CUSTOMER_ID')
                    .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                    .leftJoin('STORAGE', 'STORAGE', 'STORAGE.ID = TRANSACTIONS.STORAGE_ID')
                    .leftJoin('DOMAINS', 'DOM_EXCHANGE_TYPE', 'DOM_EXCHANGE_TYPE.DOM_ID = :DOM_EXCHANGE_TYPE AND DOM_EXCHANGE_TYPE.ID = TRANSACTIONS.DOM_ID_EXCHANGE_TYPE', {DOM_EXCHANGE_TYPE: domain.ExchangeType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_TYPE', 'DOM_GOLD_TYPE.DOM_ID = :DOM_GOLD_TYPE AND DOM_GOLD_TYPE.ID = TRANSACTIONS.DOM_ID_GOLD_TYPE', {DOM_GOLD_TYPE: domain.GoldType})
                    .where(condition)
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
                                isSuccess: false,
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

    async getWorkshopReport(report: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let condition: string = `1=1 and TRANSACTIONS.DOM_ID_ACCOUNT_TYPE = ${enAccountType.workshop}`;
                condition += report?.exchangeType ? ` and DOM_EXCHANGE_TYPE.id=${report.exchangeType}` : ``;
                condition += report?.storageId ? ` and STORAGE.id=${report.storageId}` : ``;
                condition += report?.goodId ? ` and GOODS.id=${report.goodId}` : ``;
                condition += report?.customerId ? ` and CUSTOMERS.id=${report.customerId}` : ``;
                condition += report?.fromDates ? ` and TRANSACTIONS.ORDER_DATE >= '${report.fromDates}'` : ``;
                condition += report?.toDates ? ` and TRANSACTIONS.SETTLEMENT_DATE <= '${report.toDates}'` : ``;
                condition += report?.workshopCode ? ` and TRANSACTIONS.ORDER_CODE = '${report.workshopCode}'` : ``;

                const transactionsEntity = getRepository(TransactionsEntity);
                // @ts-ignore
                transactionsEntity.createQueryBuilder('TRANSACTIONS')
                    .select(['TRANSACTIONS.*',
                        `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        `ISNULL(CUSTOMERS.MOBILE, CUSTOMERS.PHONE) AS CUSTOMER_TEL`,
                        'GOODS.TITLE AS GOOD_TITLE',
                        'STORAGE.TITLE AS STORAGE_TITLE',
                        'DOM_EXCHANGE_TYPE.TITLE AS DOM_EXCHANGE_TYPE_TITLE',
                        'DOM_ORDER_TYPE.TITLE AS DOM_ORDER_TYPE_TITLE',
                        'DOM_GOLD_TYPE.TITLE AS DOM_GOLD_TYPE_TITLE',
                        '(ISNULL(TRANSACTIONS.GOLD_WEIGHT,0) - ISNULL(TRANSACTIONS.DIFFERENT_WEIGHT,0)) as TOTAL_WEIGHT',
                    ])
                    .leftJoin('TRANSACTIONS', 'T', 'T.ID = TRANSACTIONS.ORDER_ID')
                    .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = T.CUSTOMER_ID')
                    .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                    .leftJoin('STORAGE', 'STORAGE', 'STORAGE.ID = TRANSACTIONS.STORAGE_ID')
                    .leftJoin('DOMAINS', 'DOM_EXCHANGE_TYPE', 'DOM_EXCHANGE_TYPE.DOM_ID = :DOM_EXCHANGE_TYPE AND DOM_EXCHANGE_TYPE.ID = TRANSACTIONS.DOM_ID_EXCHANGE_TYPE', {DOM_EXCHANGE_TYPE: domain.ExchangeType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_TYPE', 'DOM_ORDER_TYPE.DOM_ID = :DOM_ORDER_TYPE AND DOM_ORDER_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_TYPE', {DOM_ORDER_TYPE: domain.OrderType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_TYPE', 'DOM_GOLD_TYPE.DOM_ID = :DOM_GOLD_TYPE AND DOM_GOLD_TYPE.ID = TRANSACTIONS.DOM_ID_GOLD_TYPE', {DOM_GOLD_TYPE: domain.GoldType})
                    .where(condition)
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
                                isSuccess: false,
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

    async getTransactionReport(report: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                let condition: string = `1=1`;
                condition += report?.exchangeType ? ` and DOM_EXCHANGE_TYPE.id = ${report.exchangeType}` : ``;
                condition += report?.storageId ? ` and STORAGE.id = ${report.storageId}` : ``;
                condition += report?.goodId ? ` and GOODS.id = ${report.goodId}` : ``;
                condition += report?.customerId ? ` and CUSTOMERS.id = ${report.customerId}` : ``;
                condition += report?.fromDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') >= '${report.fromDates}_00:00:00'` : ``;
                condition += report?.toDates ? ` and FORMAT(TRANSACTIONS.CREATE_DATE_TIME,'##/##/##_##:##:##') <= '${report.toDates}_99:99:99'` : ``;
                condition += report?.accountType ? ` and DOM_ACCOUNT_TYPE.id = ${report.accountType}` : ``;
                condition += report?.accountType ? ` and USERS.id = ${report.userId}` : ``;

                const transactionsEntity = getRepository(TransactionsEntity);
                // @ts-ignore
                transactionsEntity.createQueryBuilder('TRANSACTIONS')
                    .select(['TRANSACTIONS.*',
                        `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        'GOODS.TITLE AS GOOD_TITLE',
                        'STORAGE.TITLE AS STORAGE_TITLE',
                        'DOM_EXCHANGE_TYPE.TITLE AS DOM_EXCHANGE_TYPE_TITLE',
                        'DOM_ACCOUNT_TYPE.TITLE AS DOM_ACCOUNT_TYPE_TITLE',
                        'DOM_GOLD_ACCOUNT.TITLE AS DOM_GOLD_ACCOUNT_TITLE',
                        'DOM_ORDER_TYPE.TITLE AS DOM_ORDER_TYPE_TITLE',
                        'DOM_ORDER_MODEL.TITLE AS DOM_ORDER_MODEL_TITLE',
                        'DOM_ORDER_GEM_TYPE.TITLE AS DOM_ORDER_GEM_TYPE_TITLE',
                        'DOM_GOLD_TYPE.TITLE AS DOM_GOLD_TYPE_TITLE',
                        'USERS.USER_NAME AS USER_NAME',
                        'CONCAT(USERS.NAME,\' \',USERS.FAMILY) AS USER_FULL_NAME',
                    ])
                    .innerJoin('USERS', 'USERS', 'USERS.ID = TRANSACTIONS.USE_ID_CREATOR')
                    .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = TRANSACTIONS.CUSTOMER_ID')
                    .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                    .leftJoin('STORAGE', 'STORAGE', 'STORAGE.ID = TRANSACTIONS.STORAGE_ID')
                    .leftJoin('DOMAINS', 'DOM_ACCOUNT_TYPE', 'DOM_ACCOUNT_TYPE.DOM_ID = :DOM_ACCOUNT_TYPE AND DOM_ACCOUNT_TYPE.ID = TRANSACTIONS.DOM_ID_ACCOUNT_TYPE', {DOM_ACCOUNT_TYPE: domain.AccountType})
                    .leftJoin('DOMAINS', 'DOM_EXCHANGE_TYPE', 'DOM_EXCHANGE_TYPE.DOM_ID = :DOM_EXCHANGE_TYPE AND DOM_EXCHANGE_TYPE.ID = TRANSACTIONS.DOM_ID_EXCHANGE_TYPE', {DOM_EXCHANGE_TYPE: domain.ExchangeType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_ACCOUNT', 'DOM_GOLD_ACCOUNT.DOM_ID = :DOM_GOLD_ACCOUNT AND DOM_GOLD_ACCOUNT.ID = TRANSACTIONS.DOM_ID_GOLD_ACCOUNT_TYPE', {DOM_GOLD_ACCOUNT: domain.GoldAccountType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_TYPE', 'DOM_ORDER_TYPE.DOM_ID = :DOM_ORDER_TYPE AND DOM_ORDER_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_TYPE', {DOM_ORDER_TYPE: domain.OrderType})
                    .leftJoin('DOMAINS', 'DOM_ORDER_MODEL', 'DOM_ORDER_MODEL.DOM_ID = :DOM_ORDER_MODEL AND DOM_ORDER_MODEL.ID = TRANSACTIONS.ORDER_MODEL', {DOM_ORDER_MODEL: domain.OrderModel})
                    .leftJoin('DOMAINS', 'DOM_ORDER_GEM_TYPE', 'DOM_ORDER_GEM_TYPE.DOM_ID = :DOM_ORDER_GEM_TYPE AND DOM_ORDER_GEM_TYPE.ID = TRANSACTIONS.DOM_ID_ORDER_GEM_TYPE', {DOM_ORDER_GEM_TYPE: domain.GemType})
                    .leftJoin('DOMAINS', 'DOM_GOLD_TYPE', 'DOM_GOLD_TYPE.DOM_ID = :DOM_GOLD_TYPE AND DOM_GOLD_TYPE.ID = TRANSACTIONS.DOM_ID_GOLD_TYPE', {DOM_GOLD_TYPE: domain.GoldType})
                    .where(condition)
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
                                isSuccess: false,
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
