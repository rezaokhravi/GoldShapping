import {IPublicRequest} from "../models/request.model";
import moment from "jalali-moment";
import {IMenu} from "../models/menu.model";
import {MenuEntity} from "../entity/menu.entity";
import {createConnection, getConnection, getRepository} from "typeorm";
import {ormConfig} from "../config/db";

export class MenuServices {

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


    async addMenu(menu: IMenu) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    let Menu = new MenuEntity();
                    const menuEntity = getRepository(MenuEntity);

                    Menu.MENU_ID = menu.MENU_ID;
                    Menu.NAME = menu.NAME;
                    Menu.TITLE = menu.TITLE;
                    Menu.ROUTE = menu.ROUTE;
                    Menu.ICON = menu.ICON;
                    Menu.ORDERING = menu.ORDERING;
                    Menu.IS_ROUTER_ACTIVE = menu.IS_ROUTER_ACTIVE;
                    Menu.DESCRIPTION = menu.DESCRIPTION;
                    Menu.USE_ID_CREATOR = menu.USE_ID_CREATOR;
                    Menu.CREATE_DATE_TIME =
                        Number(
                            moment()
                                .locale('fa')
                                .format('jYYYYjMMjDDHHmmss')
                        );
                    Menu.MODIFY_USE_ID = null;
                    Menu.MODIFY_DATE_TIME = null;

                    // @ts-ignore
                    menuEntity.find({TITLE: menu.TITLE, NAME: menu.NAME})
                        .then((res: any) => {
                            if (res.length > 0) {
                                this.requestResult = {
                                    status: 200,
                                    isSuccess: false,
                                    data: [],
                                    faMessage: 'منوی وارد شده تکراری می باشد!!!',
                                    enMessage: 'menu already exists in the current database'
                                }
                                resolve(this.requestResult);
                            } else {
                                menuEntity.save(Menu)
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

    async editMenu(menu: IMenu) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {
                    let Menu = new MenuEntity();
                    const menuEntity = getRepository(MenuEntity);
                    // @ts-ignore
                    menuEntity.findOne(menu.ID)
                        .then((res: any) => {
                            if (res) {
                                Menu = res;
                                Menu.MENU_ID = menu.MENU_ID;
                                Menu.NAME = menu.NAME;
                                Menu.TITLE = menu.TITLE;
                                Menu.ROUTE = menu.ROUTE;
                                Menu.ICON = menu.ICON;
                                Menu.ORDERING = menu.ORDERING;
                                Menu.IS_ROUTER_ACTIVE = menu.IS_ROUTER_ACTIVE;
                                Menu.DESCRIPTION = menu.DESCRIPTION;
                                Menu.MODIFY_USE_ID = null;
                                Menu.MODIFY_DATE_TIME = Number(
                                    moment()
                                        .locale('fa')
                                        .format('jYYYYjMMjDDHHmmss')
                                );

                                menuEntity.save(Menu)
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

    async deleteMenu(menu: IMenu) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const menuEntity = getRepository(MenuEntity);
                    // @ts-ignore
                    menuEntity.findOne(menu.ID)
                        .then((res: any) => {
                            if (res) {
                                menuEntity.remove(res)
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

    async getAllMenu() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const menuEntity = getRepository(MenuEntity);
                    // @ts-ignore
                    menuEntity
                        .createQueryBuilder('MENUS')
                        .select(['MENUS.*', 'P_MENUS.TITLE as P_MENUS_TITLE'])
                        .leftJoin('MENUS', 'P_MENUS', 'P_MENUS.id=MENUS.MENU_ID')
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

    async getAllMenuTitle() {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const menuEntity = getRepository(MenuEntity);
                    // @ts-ignore
                    menuEntity
                        .createQueryBuilder('MENUS')
                        .select(['MENUS.ID as value', 'MENUS.TITLE as label'])
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

    async getAllMenuByUserId(userId: number) {
        try {
            return new Promise<IPublicRequest>(async (resolve) => {

                    const menuEntity = getRepository(MenuEntity);
                    // @ts-ignore
                    menuEntity
                        .createQueryBuilder('MENUS')
                        .select(['MENUS.*', 'P_MENUS.TITLE as P_MENUS_TITLE', 'UP.CAN_SELECT as CAN_SELECT', 'UP.CAN_INSERT as CAN_INSERT', 'UP.CAN_UPDATE as CAN_UPDATE', 'UP.CAN_DELETE as CAN_DELETE', 'UP.START_DATE_TIME as START_DATE_TIME', 'UP.END_DATE_TIME as END_DATE_TIME'])
                        .innerJoin('USER_PERMISSION',
                            'UP',
                            `UP.USE_ID=:userId and UP.MENU_ID=MENUS.ID and UP.START_DATE_TIME <= :currentDate and UP.END_DATE_TIME >=:currentDate `,
                            {userId: userId, currentDate: moment().locale('fa').format('jYYYY/jMM/jDD')}
                        )
                        .leftJoin('MENUS', 'P_MENUS', 'P_MENUS.id=MENUS.MENU_ID')
                        .orderBy('MENUS.ORDERING', 'ASC')
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
                                    isSuccess: false,
                                    data: [],
                                    faMessage: `کاربر گرامی شما فاقد مجوز دسترسی به سیستم هستید!!!`,
                                    enMessage: ''
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
