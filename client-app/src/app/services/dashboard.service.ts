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
export class DashboardService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {

  }

  getFnDashboardTransaction(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardTransaction`,)
      .pipe(
      catchError(this.handleError<IPublicRequest>('getFnDashboardTransaction'))
    );
  }

  getFnDashboardGoldCreature(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardGoldCreature`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardGoldCreature'))
      );
  }

  getFnDashboardStorageCreature(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardStorageCreature`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardStorageCreature'))
      );
  }

  getFnDashboardCashCreature(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardCashCreature`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardCashCreature'))
      );
  }

  getFnDashboardGoldCard(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardGoldCard`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardGoldCard'))
      );
  }

  getFnDashboardOrders(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardOrders`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardOrders'))
      );
  }

  getFnDashboardTransactionToDay(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardTransactionToDay`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardTransactionToDay'))
      );
  }
  getFnDashboardGoodCreature(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/dashboard/getFnDashboardGoodCreature`,)
      .pipe(
        catchError(this.handleError<IPublicRequest>('getFnDashboardGoodCreature'))
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
