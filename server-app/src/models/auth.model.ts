export interface ILogin{
    USER?:string,
    PASSWORD?: string,
}
export interface IUserLogin{
    ID:number,
    NAME:string,
    FAMILY: string,
    EMAIL: string,
    MOBILE: string,
    EXPIRE_TOKEN_DATE:string,
    PERMISSIONS:any[]
}


