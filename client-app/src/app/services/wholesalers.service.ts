import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {IWholesaler} from "../models/data-models";


@Injectable({
  providedIn: 'root'
})
export class WholesalersService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addWholesaler(wholesaler: IWholesaler): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/wholesalers/create`, {
      wholesaler: wholesaler
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addWholesaler'))
    );
  }

  editWholesaler(wholesaler: IWholesaler): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/wholesalers/edit`, {
      wholesaler: wholesaler
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editWholesaler'))
    );
  }

  deleteWholesaler(wholesaler: IWholesaler): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/wholesalers/delete`, {
      wholesaler: wholesaler
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deleteWholesaler'))
    );
  }

  getAllWholesaler(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/wholesalers/getAll`).pipe(
      catchError(this.handleError<IPublicRequest>('getAllWholesaler'))
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
