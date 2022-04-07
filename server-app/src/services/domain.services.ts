import * as sql from 'mssql';
import {IPublicRequest} from "../models/request.model";
import {DomainsEntity} from "../entity/domains.entity";
import {domain} from "../enum";
import moment from "jalali-moment";
import {IDomains} from "../models/domains.model";
import {createConnection, getConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class DomainServices {

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

    async getOrderType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {


                    //if (db.result.isSuccess) {
                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.OrderType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getGoldAccountType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.GoldAccountType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getAccountType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.AccountType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getGemType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.GemType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getExchangeType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.ExchangeType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getReceivedStatement() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.ReceivedStatement})
                        .orderBy('dom.ORDERING', 'ASC')
                        .getRawMany()
                        .then((res) => {
                            if (res.length > 0) {
                                // db.cnn.close();
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

    async getUserType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.UserType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getGoodType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.GoodType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getGoldType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.GoldType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getStorageType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.StorageType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getCashType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.CashType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getGender() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.DESCRIPTION as label', 'dom.title', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.Gender})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getOrderModel() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.OrderModel})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getBehalfType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.BehalfType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async getPaymentType() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('dom')
                        .select(['dom.title as label', 'dom.id as value'])
                        .where('dom.dom_id=:domId and ISNULL(is_active,1)=1', {domId: domain.PaymentType})
                        .orderBy('dom.ORDERING', 'ASC')
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

    async addDomain(domain: IDomains) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Domain = new DomainsEntity();
                    const domainsEntity = getRepository(DomainsEntity);

                    Domain.DOM_ID = domain.DOM_ID;
                    Domain.NAME = domain.NAME;
                    Domain.TITLE = domain.TITLE;
                    Domain.CODE = domain.CODE;
                    Domain.IS_ACTIVE = domain.IS_ACTIVE;
                    Domain.ORDERING = domain.ORDERING;
                    Domain.DESCRIPTION = domain.DESCRIPTION;
                    Domain.USE_ID_CREATOR = domain.USE_ID_CREATOR;
                    Domain.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Domain.MODIFY_USE_ID = null;
                    Domain.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    domainsEntity.find({TITLE: domain.TITLE, NAME: domain.NAME})
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'ثبات وارد شده تکراری می باشد!!!',
                                    enMessage: 'domain already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                domainsEntity.save(Domain)
                                    .then((User: any) => {

                                        this.requestResult = {
                                            status: 200,
                                            isSuccess: true,
                                            data: [User],
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

    async editDomain(domain: IDomains) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Domain = new DomainsEntity();
                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity.findOne(domain.ID)
                        .then((res: any) => {
                            if (res) {
                                Domain = res;
                                Domain.DOM_ID = domain.DOM_ID;
                                Domain.NAME = domain.NAME;
                                Domain.TITLE = domain.TITLE;
                                Domain.CODE = domain.CODE;
                                Domain.IS_ACTIVE = domain.IS_ACTIVE;
                                Domain.ORDERING = domain.ORDERING;
                                Domain.DESCRIPTION = domain.DESCRIPTION;
                                Domain.MODIFY_USE_ID = null;
                                Domain.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                domainsEntity.save(Domain)
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
                                    faMessage: `مجوز درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists permission in the current database'
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

    async deleteDomain(domain: IDomains) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Domain = new DomainsEntity();
                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity.findOne(domain.ID)
                        .then((res: any) => {
                            if (res) {
                                Domain = res;
                                Domain.IS_ACTIVE = false;
                                domainsEntity.save(Domain)
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

    async getAllDomainById(domId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('')
                        .select(['*'])
                        .where('dom_id=:domId and ISNULL(is_active,1)=1', {domId: domId})
                        .getRawMany()
                        .then(async (res) => {
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
            return this.requestResult = {
                status: 200,
                isSuccess: false,
                data: [],
                faMessage: 'عملیات با خطا مواجه شد، مجددا تلاش نمایید.',
                enMessage: error.message
            };
        }
    }

    async getDomainTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const domainsEntity = getRepository(DomainsEntity);
                    // @ts-ignore
                    domainsEntity
                        .createQueryBuilder('')
                        .select(['ID as value', 'TITLE as label'])
                        .where('dom_id IS NULL and ISNULL(is_active,1)=1')
                        .getRawMany()
                        .then(async (res: any) => {
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
                                    faMessage: `رکوردی یافت نشد!!!`,
                                    enMessage: 'don\'t exists row in table'
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
