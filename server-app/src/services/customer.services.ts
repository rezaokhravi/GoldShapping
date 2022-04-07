import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {ICustomer} from "../models/customers.model";
import {CustomersEntity} from "../entity/customers.entity";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class CustomerServices {


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
    async addCustomer(customer: ICustomer) {
        try {

            return new Promise<IPublicRequest>(async (resolve) => {

                    let Customers = new CustomersEntity();
                    const customerEntity = getRepository(CustomersEntity);
                    Customers.NAME = customer.NAME;
                    Customers.CODE = customer.CODE;
                    Customers.FAMILY = customer.FAMILY;
                    Customers.MOBILE = customer.MOBILE;
                    Customers.NATIONAL_CODE = customer.NATIONAL_CODE;
                    Customers.PHONE = customer.PHONE;
                    Customers.ADDRESS = customer.ADDRESS;
                    Customers.DOM_ID_GENDER = customer.DOM_ID_GENDER;
                    Customers.JOB_TITLE = customer.JOB_TITLE;
                    Customers.DESCRIPTION = customer.DESCRIPTION;
                    Customers.USE_ID_CREATOR = customer.CREATE_DATE_TIME;
                    Customers.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Customers.MODIFY_USE_ID = null;
                    Customers.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    customerEntity.find({NATIONAL_CODE: customer.NATIONAL_CODE})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'مشتری وارد شده تکراری می باشد!!!',
                                    enMessage: 'customer already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                customerEntity.save(Customers)
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
    async editCustomer(customer: ICustomer) {
        try {
            // @ts-ignore
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Customers = new CustomersEntity();
                    const customerEntity = getRepository(CustomersEntity);
                    // @ts-ignore
                    customerEntity.findOne(customer.ID)
                        .then((res: any) => {
                            if (res) {
                                Customers = res;

                                Customers.NAME = customer.NAME;
                                Customers.CODE = customer.CODE;
                                Customers.FAMILY = customer.FAMILY;
                                Customers.MOBILE = customer.MOBILE;
                                Customers.NATIONAL_CODE = customer.NATIONAL_CODE;
                                Customers.PHONE = customer.PHONE;
                                Customers.ADDRESS = customer.ADDRESS;
                                Customers.DOM_ID_GENDER = customer.DOM_ID_GENDER;
                                Customers.DESCRIPTION = customer.DESCRIPTION;
                                Customers.JOB_TITLE = customer.JOB_TITLE;
                                Customers.MODIFY_USE_ID = null;
                                Customers.MODIFY_DATE_TIME =
                                    Number(
                                        moment()
                                            .locale('fa')
                                            .format('jYYYYjMMjDDHHmmss')
                                    );
                                customerEntity.save(Customers)
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
                                    faMessage: `مشتری درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists customer in the current database'
                                };
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
    async deleteCustomer(customer: ICustomer) {
        try {

            return new Promise<IPublicRequest>(async (resolve) => {

                    const customerEntity = getRepository(CustomersEntity);
                    // @ts-ignore
                    customerEntity.findOne(customer.ID)
                        .then((res: any) => {
                            if (res) {
                                customerEntity.remove(res)
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
                                    faMessage: `مشتری درخواست شده بافت نشد!!!`,
                                    enMessage: 'don\'t exists customer in the current database'
                                };
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

    async getAllCustomer() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const customerEntity = getRepository(CustomersEntity);
                    // @ts-ignore
                    customerEntity.find()
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

    async getFullTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const customerEntity = getRepository(CustomersEntity);
                    // @ts-ignore
                    customerEntity
                        .createQueryBuilder('customer')
                        .select([`CONCAT(customer.NATIONAL_CODE,' - ',customer.NAME,' ',customer.FAMILY,' - ',customer.MOBILE) as label`, 'customer.ID as value'])
                        .orderBy('customer.FAMILY ASC , customer.NAME', 'ASC')
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
