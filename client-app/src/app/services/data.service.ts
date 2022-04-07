import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICash, ICustomer, IStorage, IStorageDate, IUser} from "../models/data-models";
import {Observable, of, pipe} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serveUrl = 'assets/data';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getCustomers():Observable<ICustomer[]>{
    return this.http.get<any>(`${this.serveUrl}/customers.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<ICustomer[]>('getCustomers', []))
      );
  }

  getStorage():Observable<IStorage[]>{
    return this.http.get<any>(`${this.serveUrl}/storage.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IStorage[]>('getStorage', []))
      );
  }

  getGoods():Observable<IStorage[]>{
    return this.http.get<any>(`${this.serveUrl}/goods.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IStorage[]>('getGoods', []))
      );
  }

  getUsers():Observable<IUser[]>{
    return this.http.get<any>(`${this.serveUrl}/users.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<IUser[]>('getUsers', []))
      );
  }

  getCash():Observable<ICash[]>{
    return this.http.get<any>(`${this.serveUrl}/cash.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<ICash[]>('getCash', []))
      );
  }

  getWholesaler():Observable<ICash[]>{
    return this.http.get<any>(`${this.serveUrl}/wholesaler.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<ICash[]>('getWholesaler', []))
      );
  }

  getWorkshop():Observable<ICash[]>{
    return this.http.get<any>(`${this.serveUrl}/workshop.json`,this.httpOptions)
      .pipe(
        catchError(this.handleError<ICash[]>('getWorkshop', []))
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
