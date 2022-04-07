import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {IDomains} from "../models/data-models";


@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addDomain(domain: IDomains): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/domains/create`, {
      domain: domain
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addDomain'))
    );
  }

  editDomain(domain: IDomains): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/domains/edit`, {
      domain: domain
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editDomain'))
    );
  }

  deleteDomain(domain: IDomains): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/domains/delete`, {
      domain: domain
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deleteDomain'))
    );
  }

  getAllDomainById( domId:number ): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/domains/getAllDomainById`, {
      domId: domId
    }).pipe(
      catchError(this.handleError<IPublicRequest>('getAllDomainById'))
    );
  }

  getDomainTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/getDomainTitle`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getDomainTitle'))
      );
  }

  getOrderType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/orderType`,this.httpOptions)
      .pipe(
      catchError(this.handleError<IPublicRequest>('getOrderType'))
    );
  }

  getGoldAccountType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/goldAccountType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getGoldAccountType'))
      );
  }

  getGoldType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/goldType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getGoldType'))
      );
  }

  getAccountType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/accountType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('geAccountType'))
      );
  }

  getGemType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/gemType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getGemType'))
      );
  }

  getExchangeType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/exchangeType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getExchangeType'))
      );
  }

  getReceivedStatement(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/receivedStatement`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getReceivedStatement'))
      );
  }

  getUserType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/userType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getUserType'))
      );
  }

  getStorageType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/storageType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getStorageType'))
      );
  }

  getCashType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/cashType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getCashType'))
      );
  }

  getGender(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/gender`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getGender'))
      );
  }

  getOrderModel(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/orderModel`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getOrderModel'))
      );
  }

  getGoodType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/goodType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getGoodType'))
      );
  }

  getBehalfType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/behalfType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getBehalfType'))
      );
  }

  getPaymentType(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/domains/paymentType`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getPaymentType'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
