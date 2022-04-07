import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { retry, catchError } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class Interceptor implements HttpInterceptor {
  constructor(private cookie: CookieService,
              private auth: AuthService,
              public messageService: MessageService,) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookie.get('token');
    const authRequest = req.clone({
      headers: new HttpHeaders({
        'token': token,
        //'Authorization': `Bearer ${localStorage.getItem("token")}`
      })
    });

    return next.handle(authRequest)
      .pipe(
        retry(1),
        catchError((error:any) =>{
          let errorMessage :any =null;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error}`;
          } else {
            // server-side error
            errorMessage = error.error;
          }
          //this.auth.logout();
          return  throwError(errorMessage);

        } )
      );
  }

}

