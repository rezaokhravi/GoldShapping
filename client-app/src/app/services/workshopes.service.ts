import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IWorkshop} from "../models/data-models";
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";


@Injectable({
  providedIn: 'root'
})
export class WorkshopesService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addWorkshop(workshop: IWorkshop): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/workshops/create`, {
      workshop: workshop
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addWorkshop'))
    );
  }

  editWorkshop(workshop: IWorkshop): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/workshops/edit`, {
      workshop: workshop
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editWorkshop'))
    );
  }

  deleteWorkshop(workshop: IWorkshop): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/workshops/delete`, {
      workshop: workshop
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deleteWorkshop'))
    );
  }

  getAllWorkshop(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/workshops/getAll`).pipe(
      catchError(this.handleError<IPublicRequest>('getAllWorkshop'))
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
