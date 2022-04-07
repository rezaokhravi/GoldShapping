import {Observable, of} from "rxjs";
import {IPublicRequest} from "../models/request";


export function handleError<T>(operation = 'operation',serviceName:string, result?: T) {

  // @ts-ignore
  let errorResult:T ={
    isSuccess:false,
    data:null,
    faMessage:'خطا در ارتباط با سرویس سرور!!!',
    status:200,
    enMessage:''
  };

  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    //console.error('error::::',error); // log to console instead

    // @ts-ignore
    errorResult.faMessage=` خطا در ارتباط با سرویس ${operation} !!!`;
    // @ts-ignore
    errorResult.enMessage=`Error on service ${serviceName}`;

    if (error.status==401){
      // @ts-ignore
      errorResult.faMessage = error.faMessage as string;
      // @ts-ignore
      errorResult.enMessage = error.enMessage as string;
      // @ts-ignore
      errorResult.status = error.status ;
    }

    // Let the app keep running by returning an empty result.
    return of(errorResult as T);
  };
}
