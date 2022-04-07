import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {IStorage} from "../models/data-models";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addStorage(storage: IStorage): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/storage/create`, {
      storage: storage
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addStorage'))
    );
  }

  editStorage(storage: IStorage): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/storage/edit`, {
      storage: storage
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editStorage'))
    );
  }

  deleteStorage(storage: IStorage): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/storage/delete`, {
      storage: storage
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deleteStorage'))
    );
  }

  getAllStorage(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/storage/getAll`).pipe(
      catchError(this.handleError<IPublicRequest>('getAllStorage'))
    );
  }

  getStorageTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/storage/getStorageTitle`).pipe(
      catchError(this.handleError<IPublicRequest>('getStorageTitle'))
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
