import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {WholesalersEntity} from "../entity/wholesalers.entity";
import {IWholesaler} from "../models/wholesalers.model";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class WholesalerServices {


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
    async addWholesaler(wholesaler: IWholesaler) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Wholesalers = new WholesalersEntity();
                    const wholesalersEntity = getRepository(WholesalersEntity);

                    Wholesalers.TITLE = wholesaler.TITLE;
                    Wholesalers.RESPONSIBLE_NAME = wholesaler.RESPONSIBLE_NAME;
                    Wholesalers.PHONE_ONE = wholesaler.PHONE_ONE;
                    Wholesalers.PHONE_TOW = wholesaler.PHONE_TOW;
                    Wholesalers.ADDRESS = wholesaler.ADDRESS;
                    Wholesalers.DESCRIPTION = wholesaler.DESCRIPTION;
                    Wholesalers.USE_ID_CREATOR = wholesaler.USE_ID_CREATOR;
                    Wholesalers.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Wholesalers.MODIFY_USE_ID = null;
                    Wholesalers.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    wholesalersEntity.find({TITLE: wholesaler.TITLE})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'بنکدار وارد شده تکراری می باشد!!!',
                                    enMessage: 'wholesaler already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                wholesalersEntity.save(Wholesalers)
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
    async editWholesaler(wholesaler: IWholesaler) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {


                    let Wholesalers = new WholesalersEntity();
                    const wholesalersEntity = getRepository(WholesalersEntity);

                    // @ts-ignore
                    wholesalersEntity.findOne(wholesaler.ID)
                        .then((res: any) => {
                            if (res) {

                                Wholesalers = res;
                                Wholesalers.TITLE = wholesaler.TITLE;
                                Wholesalers.RESPONSIBLE_NAME = wholesaler.RESPONSIBLE_NAME;
                                Wholesalers.PHONE_ONE = wholesaler.PHONE_ONE;
                                Wholesalers.PHONE_TOW = wholesaler.PHONE_TOW;
                                Wholesalers.ADDRESS = wholesaler.ADDRESS;
                                Wholesalers.DESCRIPTION = wholesaler.DESCRIPTION;
                                Wholesalers.MODIFY_USE_ID = null;
                                Wholesalers.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                wholesalersEntity.save(Wholesalers)
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
                                    faMessage: `بنکدار درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists wholesaler in the current database'
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
    async deleteWholesaler(wholesaler: IWholesaler) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const wholesalersEntity = getRepository(WholesalersEntity);

                    // @ts-ignore
                    wholesalersEntity.findOne(wholesaler.ID)
                        .then((res: any) => {
                            if (res) {
                                wholesalersEntity.remove(res)
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
                                    faMessage: `بنکدار درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists wholesaler in the current database'
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

    async getAllWholesaler() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const wholesalersEntity = getRepository(WholesalersEntity);
                    // @ts-ignore
                    wholesalersEntity.find()
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
