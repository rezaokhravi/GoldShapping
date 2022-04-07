import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICustomer} from "../models/data-models";
import {Observable, of, pipe} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addCustomer(customer: ICustomer): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/customers/create`, {
      customer: customer
    }).pipe(
      catchError(handleError<IPublicRequest>('ایجاد مشتری','addCustomer'))
    );
  }

  editCustomer(customer: ICustomer): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/customers/edit`, {
      customer: customer
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش مشتری','editCustomer'))
    );
  }

  deleteCustomer(customer: ICustomer): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/customers/delete`, {
      customer: customer
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف مشتری','deleteCustomer'))
    );
  }

  getAllCustomer(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/customers/getAll`).pipe(
      catchError(handleError<IPublicRequest>('لیست مشتری','getAllCustomer'))
    );
  }

  getFullTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/customers/getFullTitle`).pipe(
      catchError(handleError<IPublicRequest>('عناوین مشتری','getFullTitle'))
    );
  }



}
