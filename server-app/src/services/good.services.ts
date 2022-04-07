import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {IGood} from "../models/good.model";
import {GoodEntity} from "../entity/good.entity";
import {domain} from "../enum";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";
import {ExitedTransactionEntity} from "../entity/exited-transaction.entity";


export class GoodServices {


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
    async addGood(good: IGood) {
        try {

            return new Promise<IPublicRequest>(async (resolve) => {

                    let Goods = new GoodEntity();
                    const goodEntity = getRepository(GoodEntity);

                    Goods.TITLE = good.TITLE;
                    Goods.DOM_ID_TYPE = good.DOM_ID_TYPE;
                    Goods.CODE = good.CODE;
                    Goods.DESCRIPTION = good.DESCRIPTION;
                    Goods.USE_ID_CREATOR = good.USE_ID_CREATOR;
                    Goods.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Goods.MODIFY_USE_ID = null;
                    Goods.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    goodEntity.find({TITLE: good.TITLE, DOM_ID_TYPE: good.DOM_ID_TYPE})
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'کالا وارد شده تکراری می باشد!!!',
                                    enMessage: 'good already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                goodEntity.save(Goods)
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
    async editGood(good: IGood) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Goods = new GoodEntity();
                    const goodEntity = getRepository(GoodEntity);

                    // @ts-ignore
                    goodEntity.findOne(good.ID)
                        .then((res: any) => {
                            if (res) {

                                Goods = res;
                                Goods.TITLE = good.TITLE;
                                Goods.DOM_ID_TYPE = good.DOM_ID_TYPE;
                                Goods.CODE = good.CODE;
                                Goods.DESCRIPTION = good.DESCRIPTION;
                                Goods.MODIFY_USE_ID = null;
                                Goods.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                goodEntity.save(Goods)
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
                                    enMessage: 'don\'t exists good in the current database'
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
    async deleteGood(good: IGood) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const goodEntity = getRepository(GoodEntity);

                    // @ts-ignore
                    goodEntity.findOne(good.ID)
                        .then((res: any) => {
                            if (res) {
                                goodEntity.remove(res)
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
                                    enMessage: 'don\'t exists good in the current database'
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

    async getAllGood() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const goodEntity = getRepository(GoodEntity);

                    goodEntity.createQueryBuilder('good')
                        .select(['good.*', 'dom.title as DOM_ID_TYPE_TITLE'])
                        .innerJoin('DOMAINS', 'dom', 'dom.dom_id =:domId and  good.DOM_ID_TYPE = dom.id', {domId: domain.GoodType})
                        .orderBy('good.title', 'ASC')
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


    async getGoodTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const goodEntity = getRepository(GoodEntity);
                    // @ts-ignore
                    goodEntity
                        .createQueryBuilder('good')
                        .select(['good.title as label', 'good.id as value'])
                        .orderBy('good.title', 'ASC')
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


    async getCountGood(data: any) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const exitedTransactionEntity = getRepository(ExitedTransactionEntity);
                    // @ts-ignore
                    exitedTransactionEntity
                        .createQueryBuilder('')
                        .select(['*'])
                        .where('GOOD_ID = :goodId and STORAGE_ID = :storageId', {
                            goodId: data.goodId,
                            storageId: data.storageId
                        })
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
