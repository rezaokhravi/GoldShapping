import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IMenu} from "../models/data-models";
import {Observable, of, pipe} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private serveUrl = environment.serverUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  addMenu(menu: IMenu): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/menus/create`, {
      menu: menu
    }).pipe(
      catchError(handleError<IPublicRequest>('ایجاد منو','addMenu'))
    );
  }

  editMenu(menu: IMenu): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/menus/edit`, {
      menu: menu
    }).pipe(
      catchError(handleError<IPublicRequest>('ویرایش منو','editMenu'))
    );
  }

  deleteMenu(menu: IMenu): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/menus/delete`, {
      menu: menu
    }).pipe(
      catchError(handleError<IPublicRequest>('حذف منو','deleteMenu'))
    );
  }

  getAllMenu(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/menus/getAll`).pipe(
      catchError(handleError<IPublicRequest>('لیست منو','getAllMenu'))
    );
  }

  getAllMenuByUserId(userId:any): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/menus/getAllMenuByUserId`,
      {
        useId:userId
      }).pipe(
      catchError(handleError<IPublicRequest>('لیست منوهای کاربر','getAllMenuByUserId'))
    );
  }

  getAllMenuTitle(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/menus/getAllMenuTitle`).pipe(
      catchError(handleError<IPublicRequest>('عناوین منو','getAllMenuTitle'))
    );
  }




}
