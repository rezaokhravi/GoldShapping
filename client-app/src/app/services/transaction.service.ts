import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IStorageDate, ITransaction} from "../models/data-models";
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {handleError} from "../functions/function";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private serveUrl = environment.serverUrl;  // URL to web api



  constructor(private http: HttpClient) {
  }


  addTransaction(transaction: ITransaction): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/transaction/create`, {
      transaction: transaction
    },httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('ثبت تبادل','addTransaction'))
    );
  }

  getTransactionById(transactionId: number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/transaction/getTransactionById`, {
      transactionId: transactionId
      },httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('دریافت تبادل','getTransactionById'))
    );
  }

  getCountSettleByCustomerId(customerId: number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/transaction/getCountSettleByCustomerId`, {
      customerId: customerId
      },httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('دریافت تعداد فاکتور تسویه نشده','getCountSettleByCustomerId'))
    );
  }

  getOrderTitleAdvice(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/transaction/getOrderTitleAdvice`,httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('دریافت لیست سفارشات','getOrderTitleAdvice'))
    );
  }

  getOrderTitleWorkShop(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/transaction/getOrderTitleWorkShop`,httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('دریافت لیست سفارشات','getOrderTitleWorkShop'))
    );
  }

  getStorageData(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/transaction/getStorageData`,httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('دریافت لیست ذخیر داده','getStorageData'))
    );
  }

  setStorageData(storageData: IStorageDate): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/transaction/setStorageData`, {
      storageData: storageData
      },httpOptions
    ).pipe(
      catchError(handleError<IPublicRequest>('ذخیره داده','setStorageData'))
    );
  }

}
