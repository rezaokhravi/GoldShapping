export interface IPayment{
    ID?:number;
    TRANSACTION_ID?: number,
    CUSTOMER_ID?: number,
    DOM_ID_TRANSFER_TYPE?: number,
    DOM_ID_PAYMENT_TYPE?: number,
    DOM_ID_BEHALF_TYPE?: number,
    PRICE?:number,
    CASH_ID?:number,
    ACCOUNT_RESIDUAL?: number,
    CASH_CREATURE?: number,
    IS_SETTLE?:boolean,
    DESCRIPTION?:string,
    USE_ID_CREATOR?:number,
    CREATE_DATE_TIME?:number,
    MODIFY_USE_ID?:number,
    MODIFY_DATE_TIME?:number,
}
