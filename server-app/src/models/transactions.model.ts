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
    R_PROFIT?: number,
    R_PAY?: number,
    R_TAX?: number,
    R_TOTAL_AMOUNT?: number,
}
