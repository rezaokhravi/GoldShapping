import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {StorageEntity} from "../entity/storage.entity";
import {IStorage} from "../models/storage.model";
import {domain} from "../enum";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";


export class StorageServices {


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
    async addStorage(storage: IStorage) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Storage = new StorageEntity();
                    const storageEntity = getRepository(StorageEntity);

                    Storage.TITLE = storage.TITLE;
                    Storage.DOM_ID_TYPE = storage.DOM_ID_TYPE;
                    Storage.DESCRIPTION = storage.DESCRIPTION;
                    Storage.USE_ID_CREATOR = storage.USE_ID_CREATOR;
                    Storage.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Storage.MODIFY_USE_ID = null;
                    Storage.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    storageEntity.find({TITLE: storage.TITLE, DOM_ID_TYPE: storage.DOM_ID_TYPE})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'انبار وارد شده تکراری می باشد!!!',
                                    enMessage: 'storage already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                storageEntity.save(Storage)
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


    async editStorage(storage: IStorage) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {


                    let Storage = new StorageEntity();
                    const storageEntity = getRepository(StorageEntity);

                    // @ts-ignore
                    storageEntity.findOne(storage.ID)
                        .then((res: any) => {
                            if (res) {

                                Storage = res;
                                Storage.TITLE = storage.TITLE;
                                Storage.DOM_ID_TYPE = storage.DOM_ID_TYPE;
                                Storage.DESCRIPTION = storage.DESCRIPTION;
                                Storage.MODIFY_USE_ID = null;
                                Storage.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                storageEntity.save(Storage)
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
                                    faMessage: `انبار درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists storage in the current database'
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


    async deleteStorage(storage: IStorage) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const storageEntity = getRepository(StorageEntity);
                    storageEntity.findOne(storage.ID)
                        .then((res: any) => {
                            if (res) {
                                storageEntity.remove(res)
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
                                    faMessage: `انبار درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists storage in the current database'
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

    async getAllStorage() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const storageEntity = getRepository(StorageEntity);
                    // @ts-ignore
                    storageEntity.createQueryBuilder('storage')
                        .select(['storage.*', 'dom.title as DOM_ID_TYPE_TITLE'])
                        .innerJoin('DOMAINS', 'dom', 'dom.dom_id =:domId and  storage.DOM_ID_TYPE = dom.id', {domId: domain.StorageType})
                        .orderBy('storage.title', 'ASC')
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


    async getStorageTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const storageEntity = getRepository(StorageEntity);
                    // @ts-ignore
                    storageEntity
                        .createQueryBuilder('storage')
                        .select(['storage.title as label', 'storage.id as value'])
                        .orderBy('storage.title', 'ASC')
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
