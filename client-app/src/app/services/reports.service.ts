import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private serveUrl = environment.serverUrl;  // URL to web api



  constructor(private http: HttpClient) {
  }


  getGoldCardReport(report: any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/reports/getGoldCardReport`, {
        report: report
    },httpOptions
    ).pipe(
      catchError(this.handleError<IPublicRequest>('getGoldCardReport'))
    );
  }

  getCustomerReport(report: any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/reports/getCustomerReport`, {
      report: report
      },httpOptions
    ).pipe(
      catchError(this.handleError<IPublicRequest>('getCustomerReport'))
    );
  }

  getWholesalerReport(report: any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/reports/getWholesalerReport`, {
      report: report
      },httpOptions
    ).pipe(
      catchError(this.handleError<IPublicRequest>('getWholesalerReport'))
    );
  }

  getWorkshopReport(report: any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/reports/getWorkshopReport`, {
      report: report
      },httpOptions
    ).pipe(
      catchError(this.handleError<IPublicRequest>('getWorkshopReport'))
    );
  }

  getTransactionReport(report: any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/reports/getTransactionReport`, {
      report: report
      },httpOptions
    ).pipe(
      catchError(this.handleError<IPublicRequest>('getTransactionReport'))
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
