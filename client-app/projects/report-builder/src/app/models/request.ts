export interface IPublicRequest {
    status:number,
    isSuccess:boolean,
    data:any[],
    faMessage: string,
    enMessage: string
}


export interface IReportDataSource {
  name?: string;
  title?: string;
  reportType?:string;
  params?: any[];
  token?:string;
  backToPreview?:boolean;
}
