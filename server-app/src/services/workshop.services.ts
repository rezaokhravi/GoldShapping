import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {IWorkshop} from "../models/workshops.model";
import {WorkshopsEntity} from "../entity/workshops.entity";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";


export class WorkshopServices {


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
    async addWorkShop(workShop: IWorkshop) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Workshops = new WorkshopsEntity();
                    const workshopsEntity = getRepository(WorkshopsEntity);

                    Workshops.TITLE = workShop.TITLE;
                    Workshops.PHONE_ONE = workShop.PHONE_ONE;
                    Workshops.PHONE_TOW = workShop.PHONE_TOW;
                    Workshops.ADDRESS = workShop.ADDRESS;
                    Workshops.RESPONSIBLE_NAME = workShop.RESPONSIBLE_NAME;
                    Workshops.DESCRIPTION = workShop.DESCRIPTION;
                    Workshops.USE_ID_CREATOR = workShop.USE_ID_CREATOR;
                    Workshops.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Workshops.MODIFY_USE_ID = null;
                    Workshops.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    workshopsEntity.find({TITLE: workShop.TITLE})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'کارگاه وارد شده تکراری می باشد!!!',
                                    enMessage: 'workshop already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                workshopsEntity.save(Workshops)
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
    async editWorkShop(workShop: IWorkshop) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Workshops = new WorkshopsEntity();
                    const workshopsEntity = getRepository(WorkshopsEntity);

                    // @ts-ignore
                    workshopsEntity.findOne(workShop.ID)
                        .then((res: any) => {
                            if (res) {

                                Workshops = res;
                                Workshops.TITLE = workShop.TITLE;
                                Workshops.PHONE_ONE = workShop.PHONE_ONE;
                                Workshops.PHONE_TOW = workShop.PHONE_TOW;
                                Workshops.ADDRESS = workShop.ADDRESS;
                                Workshops.RESPONSIBLE_NAME = workShop.RESPONSIBLE_NAME;
                                Workshops.DESCRIPTION = workShop.DESCRIPTION;
                                Workshops.MODIFY_USE_ID = null;
                                Workshops.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                workshopsEntity.save(Workshops)
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
                                    faMessage: `کارگاه درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists workshop in the current database'
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
    async deleteWorkShop(workShop: IWorkshop) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const workshopsEntity = getRepository(WorkshopsEntity);
                    workshopsEntity.findOne(workShop.ID)
                        .then((res: any) => {
                            if (res) {

                                workshopsEntity.remove(res)
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
                                    faMessage: `کارگاه درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists workshop in the current database'
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


    async getAllWorkShop() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const workshopsEntity = getRepository(WorkshopsEntity);
                    // @ts-ignore
                    workshopsEntity.find()
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
