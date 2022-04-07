import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {ICash} from "../models/cashes.model";
import {CashesEntity} from "../entity/cashes.entity";
import {domain} from "../enum";
import {StorageEntity} from "../entity/storage.entity";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class CashServices {


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
    async addCash(cash: ICash) {
        try {
            // @ts-ignore
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Cash = new CashesEntity();

                    Cash.TITLE = cash.TITLE;
                    Cash.CARD_NUMBER = cash.CARD_NUMBER;
                    Cash.ACCOUNT_NUMBER = cash.ACCOUNT_NUMBER;
                    Cash.DOM_ID_TYPE = cash.DOM_ID_TYPE;
                    Cash.DESCRIPTION = cash.DESCRIPTION;
                    Cash.CASH_CREATURE = cash.CASH_CREATURE;
                    Cash.USE_ID_CREATOR = cash.USE_ID_CREATOR;
                    Cash.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Cash.MODIFY_USE_ID = null;
                    Cash.MODIFY_DATE_TIME = null;

                    const cashesEntity = getRepository(CashesEntity);

                    // @ts-ignore
                    cashesEntity.find({TITLE: cash.TITLE, DOM_ID_TYPE: cash.DOM_ID_TYPE})
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'صندوق وارد شده تکراری می باشد!!!',
                                    enMessage: 'cash already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                cashesEntity.save(Cash)
                                    .then((cash: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [cash],
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
    async editCash(cash: ICash) {
        try {
            // @ts-ignore
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Cash = new CashesEntity();
                    const cashesEntity = getRepository(CashesEntity);
                    // @ts-ignore
                    cashesEntity.findOne(cash.ID)
                        .then((res: any) => {
                            if (res) {
                                Cash = res;
                                Cash.TITLE = cash.TITLE;
                                Cash.CARD_NUMBER = cash.CARD_NUMBER;
                                Cash.ACCOUNT_NUMBER = cash.ACCOUNT_NUMBER;
                                Cash.DOM_ID_TYPE = cash.DOM_ID_TYPE;
                                Cash.CASH_CREATURE = cash.CASH_CREATURE;
                                Cash.DESCRIPTION = cash.DESCRIPTION;
                                Cash.MODIFY_USE_ID = null;
                                Cash.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                cashesEntity.save(Cash)
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
    async deleteCash(cash: ICash) {
        try {

            return new Promise<IPublicRequest>(async (resolve) => {

                    const cashesEntity = getRepository(CashesEntity);
                    // @ts-ignore
                    cashesEntity.findOne(cash.ID)
                        .then((res: any) => {
                            if (res) {
                                cashesEntity.remove(res)
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

    async getAllCash() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const cashesEntity = getRepository(CashesEntity);
                    // @ts-ignore
                    cashesEntity.createQueryBuilder('cash')
                        .select(['cash.*', 'dom.title as DOM_ID_TYPE_TITLE'])
                        .innerJoin('DOMAINS', 'dom', 'dom.dom_id =:domId and  cash.DOM_ID_TYPE = dom.id', {domId: domain.CashType})
                        .orderBy('cash.title', 'ASC')
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

    async getCashesTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const cashesEntity = getRepository(CashesEntity);
                    // @ts-ignore
                    cashesEntity
                        .createQueryBuilder('cash')
                        .select(['cash.title as label', 'cash.id as value'])
                        .orderBy('cash.title', 'ASC')
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
