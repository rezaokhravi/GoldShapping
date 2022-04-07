import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {domain, enTransferType} from "../enum";
import {PaymentsEntity} from "../entity/payments.entity";
import {IPayment} from "../models/payments.model";
import {createConnection, getManager, getRepository} from "typeorm";
import {ormConfig} from "../config/db";
import {CashesEntity} from "../entity/cashes.entity";

export class PaymentServices {


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
    async addPayment(payment: IPayment) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Payment = new PaymentsEntity();
                    let Cash = new CashesEntity();

                    Payment.DOM_ID_TRANSFER_TYPE = payment.DOM_ID_TRANSFER_TYPE
                    Payment.DOM_ID_PAYMENT_TYPE = payment.DOM_ID_PAYMENT_TYPE
                    Payment.DOM_ID_BEHALF_TYPE = payment.DOM_ID_BEHALF_TYPE
                    Payment.ACCOUNT_RESIDUAL = payment.ACCOUNT_RESIDUAL
                    Payment.CASH_CREATURE = payment.CASH_CREATURE
                    Payment.CASH_ID = payment.CASH_ID
                    Payment.IS_SETTLE = payment.IS_SETTLE
                    Payment.TRANSACTION_ID = payment.TRANSACTION_ID
                    Payment.CUSTOMER_ID = payment.CUSTOMER_ID
                    Payment.PRICE = payment.PRICE
                    Payment.DESCRIPTION = payment.DESCRIPTION;
                    Payment.USE_ID_CREATOR = payment.USE_ID_CREATOR;
                    Payment.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Payment.MODIFY_USE_ID = null;
                    Payment.MODIFY_DATE_TIME = null;
                    //   const paymentsEntity = getRepository(PaymentsEntity);
                    // paymentsEntity.save(Payment)
                    await getManager().transaction(async entityManager => {
                        await entityManager.findOne(CashesEntity, {ID: payment.CASH_ID})
                            .then(async val => {
                                if (val) {
                                    Cash = val;
                                    if (payment.DOM_ID_PAYMENT_TYPE == enTransferType.payment) {
                                        // @ts-ignore
                                        Cash.CASH_CREATURE = Cash.CASH_CREATURE + payment.PRICE
                                    } else {
                                        // @ts-ignore
                                        Cash.CASH_CREATURE = Cash.CASH_CREATURE - payment.PRICE
                                    }
                                    await entityManager.save(Cash);

                                    Payment.CASH_CREATURE = Cash.CASH_CREATURE;
                                    await entityManager.save(Payment);
                                }
                            });
                    }).then((val: any) => {
                        this.requestResult = {
                            status: 200,
                            isSuccess: true,
                            data: [val],
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
    async editPayment(payment: IPayment) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Payment = new PaymentsEntity();
                    const paymentEntity = getRepository(PaymentsEntity);
                    // @ts-ignore
                    paymentEntity.findOne(payment.ID)
                        .then((res: any) => {
                            if (res) {
                                Payment = res;
                                Payment.DOM_ID_TRANSFER_TYPE = payment.DOM_ID_TRANSFER_TYPE
                                Payment.DOM_ID_PAYMENT_TYPE = payment.DOM_ID_PAYMENT_TYPE
                                Payment.DOM_ID_BEHALF_TYPE = payment.DOM_ID_BEHALF_TYPE
                                Payment.ACCOUNT_RESIDUAL = payment.ACCOUNT_RESIDUAL
                                Payment.CASH_CREATURE = payment.CASH_CREATURE
                                Payment.CASH_ID = payment.CASH_ID
                                Payment.IS_SETTLE = payment.IS_SETTLE
                                Payment.TRANSACTION_ID = payment.TRANSACTION_ID
                                Payment.CUSTOMER_ID = payment.CUSTOMER_ID
                                Payment.PRICE = payment.PRICE
                                Payment.DESCRIPTION = payment.DESCRIPTION;
                                Payment.MODIFY_USE_ID = null;
                                Payment.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                paymentEntity.save(Payment)
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
                                        };
                                        resolve(this.requestResult);
                                    });

                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `صندوق درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists cash in the current database'
                                }
                                resolve(this.requestResult);
                            }
                        }).catch((error: any) => {
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
    async deletePayment(payment: IPayment) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const paymentEntity = getRepository(PaymentsEntity);

                    // @ts-ignore
                    paymentEntity.findOne(payment.ID)
                        .then((res: any) => {
                            if (res) {
                                paymentEntity.remove(res)
                                    .then(value => {
                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [value],
                                            faMessage: 'عملیات با موفقیت انجام گردید.',
                                            enMessage: 'success'
                                        }
                                        resolve(this.requestResult);
                                    }).catch((error: any) => {
                                    this.requestResult = {
                                        status: 200,
                                        isSuccess: false,
                                        data: [],
                                        faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                                        enMessage: error.message
                                    };
                                    resolve(this.requestResult);
                                });
                            } else {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `صندوق درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists cash in the current database'
                                }
                                resolve(this.requestResult);
                            }
                        }).catch((error: any) => {
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

    async getAllPayment() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const paymentEntity = getRepository(PaymentsEntity);
                    // @ts-ignore
                    paymentEntity.createQueryBuilder('payment')
                        .select([
                            'payment.*',
                            'dom_behalf_type.title as DOM_ID_BEHALF_TYPE_TITLE',
                            'dom_payment_type.title as DOM_ID_PAYMENT_TYPE_TITLE',
                            'dom_transfer_type.title as DOM_ID_TRANSFER_TYPE_TITLE',
                            'CASHES.TITLE as CASHES_TITLE',
                            'GOODS.TITLE as GOOD_TITLE',
                            `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        ])
                        .leftJoin('DOMAINS', 'dom_behalf_type', 'dom_behalf_type.dom_id =:dom_behalf_type and  payment.DOM_ID_BEHALF_TYPE = dom_behalf_type.id', {dom_behalf_type: domain.BehalfType})
                        .leftJoin('DOMAINS', 'dom_payment_type', 'dom_payment_type.dom_id =:dom_payment_type and  payment.DOM_ID_PAYMENT_TYPE = dom_payment_type.id', {dom_payment_type: domain.PaymentType})
                        .leftJoin('DOMAINS', 'dom_transfer_type', 'dom_transfer_type.dom_id =:dom_transfer_type and  payment.DOM_ID_TRANSFER_TYPE = dom_transfer_type.id', {dom_transfer_type: domain.TransferType})
                        .leftJoin('CASHES', 'CASHES', 'payment.CASH_ID = CASHES.id')
                        .leftJoin('TRANSACTIONS', 'TRANSACTIONS', 'TRANSACTIONS.ID = payment.TRANSACTION_ID')
                        .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = payment.CUSTOMER_ID')
                        .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                        .orderBy('payment.id', 'ASC')
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

    async getPaymentByTransactionId(transactionId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const paymentEntity = getRepository(PaymentsEntity);
                    // @ts-ignore
                    paymentEntity.createQueryBuilder('payment')
                        .select([
                            'payment.*',
                            'dom_behalf_type.title as DOM_ID_BEHALF_TYPE_TITLE',
                            'dom_payment_type.title as DOM_ID_PAYMENT_TYPE_TITLE',
                            'dom_transfer_type.title as DOM_ID_TRANSFER_TYPE_TITLE',
                            'CASHES.TITLE as CASHES_TITLE',
                            'GOODS.TITLE as GOOD_TITLE',
                            `CONCAT(CUSTOMERS.NAME , ' ' , CUSTOMERS.FAMILY) AS CUSTOMER_FULL_NAME`,
                        ])
                        .leftJoin('DOMAINS', 'dom_behalf_type', 'dom_behalf_type.dom_id =:dom_behalf_type and  payment.DOM_ID_BEHALF_TYPE = dom_behalf_type.id', {dom_behalf_type: domain.BehalfType})
                        .leftJoin('DOMAINS', 'dom_payment_type', 'dom_payment_type.dom_id =:dom_payment_type and  payment.DOM_ID_PAYMENT_TYPE = dom_payment_type.id', {dom_payment_type: domain.PaymentType})
                        .leftJoin('DOMAINS', 'dom_transfer_type', 'dom_transfer_type.dom_id =:dom_transfer_type and  payment.DOM_ID_TRANSFER_TYPE = dom_transfer_type.id', {dom_transfer_type: domain.TransferType})
                        .leftJoin('CASHES', 'CASHES', 'payment.CASH_ID = CASHES.id')
                        .leftJoin('TRANSACTIONS', 'TRANSACTIONS', 'TRANSACTIONS.ID = payment.TRANSACTION_ID')
                        .leftJoin('CUSTOMERS', 'CUSTOMERS', 'CUSTOMERS.ID = payment.CUSTOMER_ID')
                        .leftJoin('GOODS', 'GOODS', 'GOODS.ID = TRANSACTIONS.GOOD_ID')
                        .where('TRANSACTION_ID=:transactionId', {transactionId: transactionId})
                        .orderBy('payment.id', 'ASC')
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

    async getFnAccountResidual(transactionId: number, customerId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {
                    const connection = getManager();
                    connection
                        .query(`select * from Fn_Account_Residual(${transactionId},${customerId})`)
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


}
