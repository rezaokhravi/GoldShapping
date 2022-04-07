import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {IPayment} from "../models/data-models";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addPayment(payment: IPayment): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/payments/create`, {
      payment: payment
    }).pipe(
      catchError(handleError<IPublicRequest>('افزودن تراکنش','addPayment'))
    );
  }

  editPayment(payment: IPayment): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/payments/edit`, {
      payment: payment
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش تراکنش','editPayment'))
    );
  }

  deletePayment(payment: IPayment): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/payments/delete`, {
      payment: payment
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف تراکنش','deletePayment'))
    );
  }

  getPaymentByTransactionId(transactionId:number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/payments/getPaymentByTransactionId`,
      {
        transactionId: transactionId
      }).pipe(
      catchError(handleError<IPublicRequest>('لیست تراکنش','getPaymentByTransactionId'))
    );
  }

  getFnAccountResidual(transactionId:number,customerId:number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/payments/getFnAccountResidual`,
      {
        transactionId: transactionId,
        customerId:customerId
      }).pipe(
      catchError(handleError<IPublicRequest>('مانده حساب','getFnAccountResidual'))
    );
  }



}
