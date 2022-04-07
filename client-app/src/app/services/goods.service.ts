import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IGood} from "../models/data-models";
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";


@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addGood(good: IGood): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/goods/create`, {
      good: good
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addGood'))
    );
  }

  editGood(good: IGood): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/goods/edit`, {
      good: good
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editGood'))
    );
  }

  deleteGood(good: IGood): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/goods/delete`, {
      good: good
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deleteGood'))
    );
  }

  getAllGood(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/goods/getAll`).pipe(
      catchError(this.handleError<IPublicRequest>('getAllGood'))
    );
  }

  getGoodTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/goods/getGoodTitle`).pipe(
      catchError(this.handleError<IPublicRequest>('getGoodTitle'))
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
