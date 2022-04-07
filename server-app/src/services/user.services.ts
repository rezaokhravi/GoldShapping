import {IUser} from "../models/users.model";
import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {UsersEntity} from "../entity/users.entity";
import {domain} from "../enum";
import {createConnection, getConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class UserServices {

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


    async addUser(user: IUser) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    User.DOM_ID_GENDER = user.DOM_ID_GENDER;
                    User.DOM_ID_USER_TYPE = user.DOM_ID_USER_TYPE;
                    User.NAME = user.NAME;
                    User.FAMILY = user.FAMILY;
                    User.NATIONAL_CODE = user.NATIONAL_CODE;
                    User.PHONE = user.PHONE;
                    User.MOBILE = user.MOBILE;
                    User.USER_NAME = user.USER_NAME;
                    User.PASSWORD = user.PASSWORD;
                    User.EMAIL = user.EMAIL;
                    User.ADDRESS = user.ADDRESS;
                    User.START_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    User.END_DATE_TIME =
                        Number(
                            moment()
                                .add(30, 'day')
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    User.IS_ACTIVE = true;
                    User.DESCRIPTION = user.DESCRIPTION;
                    User.USE_ID_CREATOR = user.USE_ID_CREATOR;
                    User.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    User.MODIFY_USE_ID = null;
                    User.MODIFY_DATE_TIME = null;

                    const usersEntity = getRepository(UsersEntity);

                    // @ts-ignore
                    usersEntity.find({NATIONAL_CODE: user.NATIONAL_CODE})
                        .then((res: any) => {
                            if (res.length > 0) {

                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'کاربر وارد شده تکراری می باشد!!!',
                                    enMessage: 'user already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                usersEntity.save(User)
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

    async editUser(user: IUser) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.findOne(user.ID)
                        .then((res: any) => {
                            if (res) {
                                User = res;
                                User.DOM_ID_GENDER = user.DOM_ID_GENDER;
                                User.DOM_ID_USER_TYPE = user.DOM_ID_USER_TYPE;
                                User.NAME = user.NAME;
                                User.FAMILY = user.FAMILY;
                                User.NATIONAL_CODE = user.NATIONAL_CODE;
                                User.PHONE = user.PHONE;
                                User.MOBILE = user.MOBILE;
                                User.USER_NAME = user.USER_NAME;
                                User.PASSWORD = user.PASSWORD;
                                User.EMAIL = user.EMAIL;
                                User.ADDRESS = user.ADDRESS;
                                User.START_DATE_TIME =
                                    Number(
                                        moment()
                                            .locale('fa')
                                            .format('jYYYYjMMjDDHHmmss')
                                    );
                                User.END_DATE_TIME =
                                    Number(
                                        moment()
                                            .add(30, 'day')
                                            .locale('fa')
                                            .format('jYYYYjMMjDDHHmmss')
                                    );
                                User.IS_ACTIVE = true;
                                User.DESCRIPTION = user.DESCRIPTION;
                                User.MODIFY_USE_ID = null;
                                User.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                usersEntity.save(User)
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
                                    faMessage: `کاربر درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists user in the current database'
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

    async deleteUser(user: IUser) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.findOne(user.ID)
                        .then((res: any) => {
                            if (res) {
                                usersEntity.remove(res)
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
                                    faMessage: `کاربر درخواست شده یافت نشد!!!`,
                                    enMessage: 'don\'t exists user in the current database'
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

    async getAllUser() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.createQueryBuilder('users')
                        .select(['users.*', 'dom.title as DOM_ID_GENDER_TITLE', 'dom.description as DOM_ID_GENDER_DESCRIPTION', 'domUserType.title as DOM_ID_USER_TYPE_TITLE'])
                        .leftJoin('DOMAINS', 'dom', 'dom.dom_id =:domId and  users.DOM_ID_GENDER = dom.id', {domId: domain.Gender})
                        .leftJoin('DOMAINS', 'domUserType', 'domUserType.dom_id =:domIdUserType and  users.DOM_ID_USER_TYPE = domUserType.id', {domIdUserType: domain.UserType})
                        .orderBy('users.NATIONAL_CODE', 'ASC')
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

    async getUserFullName() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.createQueryBuilder('USERS')
                        .select(['USERS.ID as value', `CONCAT(USERS.NAME,' ',USERS.FAMILY) as label`])
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

    async getUserById(userId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.createQueryBuilder('')
                        .select(['*'])
                        .where('ID=:userId', {userId: userId})
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

    async uploadFile(files: any, userId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.findOne(userId)
                        .then((res) => {
                            if (res) {

                                User = res;
                                User.IMAGE_USER = files.data.toString('base64');
                                usersEntity.save(User)
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

    async getImageUserById(userId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let User = new UsersEntity();
                    const usersEntity = getRepository(UsersEntity);
                    // @ts-ignore
                    usersEntity.createQueryBuilder('')
                        .select(['IMAGE_USER'])
                        .where('ID=:userId', {userId: userId})
                        .getRawMany()
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
                                    isSuccess: false,
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
