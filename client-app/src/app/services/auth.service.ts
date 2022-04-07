import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ICurrentUser, ILogin, IUser} from "../models/data-models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {IPublicRequest} from "../models/request";
import {catchError} from "rxjs/operators";
import {VariablesService} from "./variables.service";
import {Router} from "@angular/router";
import {handleError} from "../functions/function";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serveUrl = environment.serverUrl;  // URL to web api
  public currentUser: BehaviorSubject<ICurrentUser|null> = new BehaviorSubject<ICurrentUser|null>(null);
  // @ts-ignore
  private urlState: string =null;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              public variablesService:VariablesService,
              public  cookie: CookieService,
              public router: Router,) {
    }


  async setCurrentUser(user: IUser) {
    try {
      // user..UrlPictureUser = `${this.webConfig.getKey(settings.file)}PersonPictures/${user.Data.GuId}.png`;
      // user.Data.urlSignatureUser = `${this.webConfig.getKey(settings.file)}SignatureImages/${user.Data.GuId}.png`;
      // @ts-ignore
      this.currentUser.next(user);
    } catch (e) {
      return e;
    }
  }

  setUrlState(url: string): void {
    try {
      this.urlState = url;
    } catch (e) {
      return e;
    }
  }

  getUrlState(): string {
    try {
      return this.urlState;
    } catch (e) {
      return e;
    }
  }

  getCurrentUser(): Observable<ICurrentUser|null> {
    try {
      return this.currentUser;
    } catch (e) {
      return e;
    }
  }



  loginUser(loginUser: ILogin): Observable<IPublicRequest> {
    return this.http.post<IPublicRequest>(`${this.serveUrl}/auth/login`, {
      user: loginUser
    }).pipe(
      catchError(handleError<IPublicRequest>('ورود کاربر','loginUser'))
    );
  }


  logout() {
    try {
      this.currentUser.next(null);
      this.cookie.deleteAll();
      localStorage.clear();
      sessionStorage.clear();
      this.variablesService.showLogin.next(true);
      this.router.navigate(['logins:login']);

    } catch (e) {
      return e
    }
  }

  changePassword(useId: number, oldPassword: string, newPassword: string): Observable<IPublicRequest> {
    try {
      return this.http.post<IPublicRequest>(`${this.serveUrl}/Auth/Login/changePassword`, {
        user_id: useId,
        oldpassword: oldPassword,
        newpassword: newPassword
      }).pipe(
        catchError(handleError<IPublicRequest>('تغییر کلمه عبور','changePassword'))
      );
    } catch (e) {
      return e;
    }
  }



}
