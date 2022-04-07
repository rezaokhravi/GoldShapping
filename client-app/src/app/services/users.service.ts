import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICash, ICustomer, IStorage, IUser} from "../models/data-models";
import {Observable, of, pipe} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addUser(user: IUser): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/create`, {
      user: user
    }).pipe(
      catchError(handleError<IPublicRequest>('ایجاد کاربر','addUser'))
    );
  }

  editUser(user: IUser): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/edit`, {
      user: user
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش کاربر','editUser'))
    );
  }

  deleteUser(user: IUser): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/delete`, {
      user: user
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف کاربر','deleteUser'))
    );
  }

  getAllUser(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/users/getAll`).pipe(
      catchError(handleError<IPublicRequest>('لیست کاربر','getAllUser'))
    );
  }

  getUserById(userId:number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/getUserById`, {
      userId: userId
    }).pipe(
      catchError(handleError<IPublicRequest>('دریافت کاربر','getUserById'))
    );
  }

  getImageUserById(userId:number): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/getImageUserById`, {
      userId: userId
    }).pipe(
      catchError(handleError<IPublicRequest>('دریافت تصویر کاربر','getImageUserById'))
    );
  }

  getUserFullName(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/users/getUserFullName`).pipe(
      catchError(handleError<IPublicRequest>('نام کاربر','getUserFullName'))
    );
  }

  uploadPicture(pictureFile:any):Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/users/upload`,pictureFile).pipe(
      catchError(handleError<IPublicRequest>('آپلود تصویر کاربر','uploadPicture'))
    );
  }




}
