import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUserPermission} from "../models/data-models";
import {Observable, of, pipe} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";


@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addPermission(userPermission: IUserPermission): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/userPermission/create`, {
      userPermission: userPermission
    }).pipe(
      catchError(this.handleError<IPublicRequest>('addPermission'))
    );
  }

  editPermission(userPermission: IUserPermission): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/userPermission/edit`, {
      userPermission: userPermission
    }).pipe(
      catchError(this.handleError<IPublicRequest>('editPermission'))
    );
  }

  deletePermission(userPermission: IUserPermission): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/userPermission/delete`, {
      userPermission: userPermission
    }).pipe(
      catchError(this.handleError<IPublicRequest>('deletePermission'))
    );
  }

  getAllPermission(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/userPermission/getAll`).pipe(
      catchError(this.handleError<IPublicRequest>('getAllPermission'))
    );
  }

  getAllPermissionByUserId(userId:number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/userPermission/getAllPermissionByUserId`, {
      userPermission: userId
    }).pipe(
      catchError(this.handleError<IPublicRequest>('getAllPermissionByUserId'))
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
