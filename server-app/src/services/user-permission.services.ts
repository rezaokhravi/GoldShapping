import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {domain} from "../enum";
import {IUserPermission} from "../models/user-permission.model";
import {UserPermissionEntity} from "../entity/user-permission.entity";
import {createConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class UserPermissionServices {

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


    async addUserPermission(userPermission: IUserPermission) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let UserPermission = new UserPermissionEntity();
                    UserPermission.MENU_ID = userPermission.MENU_ID;
                    UserPermission.USE_ID = userPermission.USE_ID;
                    UserPermission.CAN_SELECT = userPermission.CAN_SELECT;
                    UserPermission.CAN_INSERT = userPermission.CAN_INSERT;
                    UserPermission.CAN_UPDATE = userPermission.CAN_UPDATE;
                    UserPermission.CAN_DELETE = userPermission.CAN_DELETE;
                    UserPermission.START_DATE_TIME = userPermission.START_DATE_TIME;
                    UserPermission.END_DATE_TIME = userPermission.END_DATE_TIME;
                    UserPermission.DESCRIPTION = userPermission.DESCRIPTION;
                    UserPermission.USE_ID_CREATOR = userPermission.USE_ID_CREATOR;
                    UserPermission.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    UserPermission.MODIFY_USE_ID = null;
                    UserPermission.MODIFY_DATE_TIME = null;

                    const userPermissionEntity = getRepository(UserPermissionEntity);

                    // @ts-ignore
                    userPermissionEntity.find({USE_ID: userPermission.USE_ID, MENU_ID: userPermission.MENU_ID})
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'مجوز وارد شده تکراری می باشد!!!',
                                    enMessage: 'permission already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                userPermissionEntity.save(UserPermission)
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

    async editUserPermission(userPermission: IUserPermission) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let UserPermission = new UserPermissionEntity();
                    const userPermissionEntity = getRepository(UserPermissionEntity);
                    // @ts-ignore
                    userPermissionEntity.findOne(userPermission.ID)
                        .then((res: any) => {
                            if (res) {
                                UserPermission = res;
                                UserPermission.MENU_ID = userPermission.MENU_ID;
                                UserPermission.USE_ID = userPermission.USE_ID;
                                UserPermission.CAN_SELECT = userPermission.CAN_SELECT;
                                UserPermission.CAN_INSERT = userPermission.CAN_INSERT;
                                UserPermission.CAN_UPDATE = userPermission.CAN_UPDATE;
                                UserPermission.CAN_DELETE = userPermission.CAN_DELETE;
                                UserPermission.START_DATE_TIME = userPermission.START_DATE_TIME;
                                UserPermission.END_DATE_TIME = userPermission.END_DATE_TIME;
                                UserPermission.DESCRIPTION = userPermission.DESCRIPTION;
                                UserPermission.MODIFY_USE_ID = null;
                                UserPermission.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                userPermissionEntity.save(UserPermission)
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

    async deleteUserPermission(userPermission: IUserPermission) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const userPermissionEntity = getRepository(UserPermissionEntity);
                    // @ts-ignore
                    userPermissionEntity.findOne(userPermission.ID)
                        .then((res: any) => {
                            if (res) {
                                userPermissionEntity.remove(res)
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
                                    isSuccess: true,
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

    async getAllUserPermission() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const userPermissionEntity = getRepository(UserPermissionEntity);
                    // @ts-ignore
                    userPermissionEntity
                        .createQueryBuilder('up')
                        .select(['up.*', 'MENUS.TITLE as MENU_TITLE', `CONCAT(USERS.NAME,' ',USERS.FAMILY) as FULL_USER_NAME`])
                        .innerJoin('MENUS', 'MENUS', 'MENUS.id==up.menu_id')
                        .innerJoin('USERS', 'USERS', 'USERS.id==up.use_id')
                        .orderBy('up.MENU_ID ASC')
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

    async getAllPermissionByUserId(useId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let UserPermission = new UserPermissionEntity();
                    const userPermissionEntity = getRepository(UserPermissionEntity);
                    // @ts-ignore
                    userPermissionEntity
                        .createQueryBuilder('up')
                        .select(['up.*', 'MENUS.TITLE as MENU_TITLE'])
                        .innerJoin('MENUS', 'MENUS', 'MENUS.id=up.menu_id')
                        .where('up.use_id=:useId', {useId: useId})
                        .orderBy('MENUS.TITLE')
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
}
