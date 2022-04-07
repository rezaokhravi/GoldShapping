import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {ICash} from "../models/data-models";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class CashesService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addCash(cash: ICash): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/cashes/create`, {
      cash: cash
    }).pipe(
      catchError(handleError<IPublicRequest>('ایجاد صندوق','addCash'))
    );
  }

  editCash(cash: ICash): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/cashes/edit`, {
      cash: cash
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش صندوق','editCash'))
    );
  }

  deleteCash(cash: ICash): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/cashes/delete`, {
      cash: cash
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف صندوق','deleteCash'))
    );
  }

  getAllCash(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/cashes/getAll`).pipe(
      catchError(handleError<IPublicRequest>('لیست صندوق','getAllCash'))
    );
  }

  getCashTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/cashes/getCashesTitle`).pipe(
      catchError(handleError<IPublicRequest>('عناوین صندوق','getCashesTitle'))
    );
  }





}
