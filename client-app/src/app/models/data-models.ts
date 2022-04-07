export interface ILogin{
  USER?:string,
  PASSWORD?: string,
}

export interface IExitedTransaction{
  ID?:number,
  GOOD_ID?:number,
  STORAGE_ID?:number,
  WEIGHT?:number,
  COUNT?:number,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface ICurrentUser{
  ID:number,
  NAME:string,
  FAMILY: string,
  EMAIL: string,
  MOBILE: string,
  EXPIRE_TOKEN_DATE:string,
  PERMISSIONS:any[]
}

export interface ICash{
  ID?:number,
  DOM_ID_TYPE?: number,
  DOM_ID_TYPE_TITLE?: string,
  TITLE?: string ,
  CARD_NUMBER?: string,
  ACCOUNT_NUMBER?: string,
  CASH_CREATURE?: number,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IStorageDate{
  MesghalPricePurchase: number,
  MesghalPriceSale:number,
  GramPrice:number
}




export interface ICustomer{
  ID?:number,
  CODE?:string,
  DOM_ID_GENDER?:number,
  DOM_ID_GENDER_TITLE?:string,
  NAME?:string,
  FAMILY?:string,
  NATIONAL_CODE?:string,
  PHONE?:string,
  MOBILE?:string,
  ADDRESS?:string,
  JOB_TITLE?:string,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
  FULL_TITLE?:string,
  FULL_NAME?:string,
}

export interface IDomains {
  ID?:number,
  DOM_ID?:number,
  CODE?: string,
  NAME?: string,
  TITLE?: string,
  IS_ACTIVE?: boolean,
  ORDERING?: number,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IGood{
  ID?:number,
  DOM_ID_TYPE?:number,
  CODE?:string,
  DOM_ID_TYPE_TITLE?:string,
  TITLE?:string,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,

}

export interface IOrder{
  ID?:number,
  TRANSACTION_ID?:number,
  ORDER_MODEL?:string,
  GEM_TYPE?:number,
  GEM_WEIGHT?:number,
  SIZE?:number,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IStorage{
  ID?:number;
  DOM_ID_TYPE?:number,
  DOM_ID_TYPE_TITLE?:string,
  TITLE?:string,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface ITransaction{
  ID?:number,
  DOM_ID_ACCOUNT_TYPE?:number,//طرف حساب
  DOM_ID_EXCHANGE_TYPE?: number,//نوع تبادل
  DOM_ID_ORDER_TYPE?: number,//نوع سفارش
  DOM_ID_GOLD_ACCOUNT_TYPE?:number,//نوع حساب طلا
  DOM_ID_ORDER_GEM_TYPE?:number,//نوع نگین
  DOM_ID_GOLD_TYPE?:number,//نوع کالا طلا
  CUSTOMER_ID?: number,// شناسه مشتری
  RECEIVED_STATEMENT?: number,//
  GOOD_ID?: number,
  ORDER_DATE?: string,
  ORDER_MODEL?: number,
  ORDER_SIZE?: number,
  ORDER_GEM_WEIGHT?: number,
  ORDER_CODE?: number,
  ORDER_ID?: number,
  SETTLEMENT_DATE?: string,
  ACCOUNT_RESIDUAL?: number,
  TOTAL_AMOUNT?: number,
  WORK_WEIGHT?: number,
  WATER_UNDER?: number,
  ROVER?: number,
  ROVER_WEIGHT_18?: number,
  MESGHAL_WEIGHT?: number,
  MESGHAL_PRICE?: number,
  GRAM_WEIGHT?: number,
  GRAM_PRICE?: number,
  MANUAL_TOTAL_AMOUNT?: boolean,
  COUNT?: number,
  STORAGE_ID?: number,
  PROFIT?: number,
  PAY?: number,
  TAX?: number,
  GOLD_BOXER?: number,
  GOLD_PRICE?: number,
  GOLD_WEIGHT?: number,
  DIFFERENT_WEIGHT?: number,
  IS_SETTLE?: boolean,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}


export interface IUser {
  ID?:number,
  DOM_ID_GENDER?:number|null,
  DOM_ID_USER_TYPE?:number|null,
  NAME?: string|null,
  FAMILY?: string|null,
  NATIONAL_CODE?: string|null,
  PHONE?: string|null,
  MOBILE?: string|null,
  IMAGE_USER?: string|null,
  USER_NAME?: string|null,
  PASSWORD?: string|null,
  EMAIL?: string|null,
  ADDRESS?: string|null,
  START_DATE_TIME?: number|null,
  END_DATE_TIME?: number|null,
  IS_ACTIVE?: boolean|null,
  DESCRIPTION?: string|null,
  USE_ID_CREATOR?: number|null,
  CREATE_DATE_TIME?: number|null,
  MODIFY_USE_ID?: number|null,
  MODIFY_DATE_TIME?: number|null,
  FULL_NAME?:string,
}

export interface IWholesaler{
  ID?:number,
  TITLE?: string,
  RESPONSIBLE_NAME?: string,
  PHONE_ONE?: string,
  PHONE_TOW?: string,
  ADDRESS?: string,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IWorkshop{
  ID?:number,
  TITLE?: string,
  RESPONSIBLE_NAME?: string,
  PHONE_ONE?: string,
  PHONE_TOW?: string,
  ADDRESS?: string,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IPayment{
  ID?:number;
  TRANSACTION_ID?: number,
  CUSTOMER_ID?: number,
  DOM_ID_EXCHANGE_TYPE?: number,
  DOM_ID_PAYMENT_TYPE?: number,
  DOM_ID_BEHALF_TYPE?: number,
  PRICE?:number,
  CASH_ID?:number,
  ACCOUNT_RESIDUAL?: number,
  IS_SETTLE?:boolean,
  CASH_CREATURE?: number,
  DESCRIPTION?:string,
  USE_ID_CREATOR?:number,
  CREATE_DATE_TIME?:number,
  MODIFY_USE_ID?:number,
  MODIFY_DATE_TIME?:number,
}

export interface IMenu {
  ID?: number,
  MENU_ID?: number,
  TITLE?: string,
  NAME?: string,
  ROUTE?: string,
  ICON?: string,
  CHILD?: any[],
  IS_ROUTER_ACTIVE?: boolean,
  ORDERING?: number,
  DESCRIPTION?: string,
  USE_ID_CREATOR?: number,
  CREATE_DATE_TIME?: number,
  MODIFY_USE_ID?: number,
  MODIFY_DATE_TIME?: number
}


export interface IUserPermission {
  ID?: number,
  USE_ID?: number,
  MENU_ID?: number,
  CAN_SELECT?: boolean,
  CAN_INSERT?: boolean,
  CAN_UPDATE?: boolean,
  CAN_DELETE?: boolean,
  START_DATE_TIME?: string,
  END_DATE_TIME?: string,
  DESCRIPTION?: string,
  USE_ID_CREATOR?: number,
  CREATE_DATE_TIME?: number,
  MODIFY_USE_ID?: number,
  MODIFY_DATE_TIME?: number,
}

export interface IReportDataSource {
  name?: string;
  title?: string;
  reportType?:string;
  params?: any[];
  token?:string;
  backToPreview?:boolean;
}


