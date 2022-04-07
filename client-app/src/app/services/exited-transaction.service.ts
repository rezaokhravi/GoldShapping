import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {IExitedTransaction} from "../models/data-models";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class ExitedTransactionService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addExitedTransaction(exitTransaction: IExitedTransaction): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/exitedTransactions/create`, {
      exitTransaction: exitTransaction
    }).pipe(
      catchError(handleError<IPublicRequest>('ایجاد روابط کالا و انبار','addExitedTransaction'))
    );
  }

  editExitedTransaction(exitTransaction: IExitedTransaction): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/exitedTransactions/edit`, {
      exitTransaction: exitTransaction
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش روابط کالا و انبار','editExitedTransaction'))
    );
  }

  deleteExitedTransaction(exitTransaction: IExitedTransaction): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/exitedTransactions/delete`, {
      exitTransaction: exitTransaction
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف روابط کالا و انبار','deleteExitedTransaction'))
    );
  }

  getAllExitedTransaction(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/exitedTransactions/getAll`).pipe(
      catchError(handleError<IPublicRequest>('لیست روابط کالا و انبار','getAllExitedTransaction'))
    );
  }


}
