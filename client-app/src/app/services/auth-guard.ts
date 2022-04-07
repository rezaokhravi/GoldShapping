import {Injectable, isDevMode} from '@angular/core';
import { CanActivateChild,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthService} from './auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Subscription} from 'rxjs';
import {environment} from "../../environments/environment";
import {EncodeService} from "./encode.service";
import * as moment from "jalali-moment";
import {ICurrentUser} from "../models/data-models";
import {MemoryStorageService} from "./memory-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private serveUrl = environment.serverUrl;
  private currentUser:ICurrentUser|null = this.auth.currentUser.getValue();

  constructor(private auth: AuthService,
              private enCode:EncodeService,
              private router: Router,
              private cookie: CookieService,
              private memory: MemoryStorageService
              ) {

  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }



  // @ts-ignore
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const token = this.cookie.get('token');
      if (token) {
        let resultToke:ICurrentUser = this.enCode.decryptData(token);
        if (resultToke.hasOwnProperty('EXPIRE_TOKEN_DATE') && resultToke.hasOwnProperty('ID'))
        {
          let currentDate:string = moment().locale('fa').format('jYYYY/jMM/jDD');
          let user = this.auth.currentUser.getValue();
          if (resultToke.EXPIRE_TOKEN_DATE > currentDate && !user  )
          {
            this.auth.currentUser.next(resultToke);

            return true;
          }else if(resultToke.EXPIRE_TOKEN_DATE > currentDate && user){
            return true;
          }
          else{
            this.auth.logout();
            return false;
          }
        }else{
          this.auth.logout();
          return false;
        }

      } else {
        this.auth.setUrlState(state.url);
        this.router.navigate(['login']).then(value => {
          return false;
        });
      }
    } catch (e) {
      return e;
    }
  }


}

/*
  async checkLogin() {

    this.auth.getLoginUser().subscribe(result => {
      if (result.Data.IsSuccess) {
        this.auth.setCurrentUser(result).then(value => {
          this.message.add({
            severity: 'success', summary: 'خوش آمدید', detail: 'ورود با موفقیت انجام شد'
          });
          return true;
        });
      } else {
        this.message.add({
          severity: 'worn', summary: 'توجه', detail: 'کاربر فعال نمی باشد'
        });
        this.router.navigate(['login']).then(value => {
          return false;
        });
      }
    }, error => {
      this.message.add({
        severity: 'error', summary: 'توجه', detail: 'ارتباط با سرور مقدور نمی باشد'
      });
      this.router.navigate(['login']).then(value => {
        return false;
      });
    });
  };



*/


/*
this.auth.setUrlState(state.url);
      this.auth.getLoginUser().subscribe(result => {
          console.log(result);
          console.log(result.Data.IsSuccess);
          if (result.Data.IsSuccess) {
            this.auth.setCurrentUser(result).then(value => {
              console.log('this.auth.currentUser.getValue()', this.auth.currentUser.getValue());
              return true;
            });
          } else {
            // this.cookie.deleteAll()
            this.auth.setUrlState(state.url);
            this.router.navigate(['login']);
            console.log('login');
            return false;
          }
        }, error => {
          // this.cookie.deleteAll()
          console.log(error);
          this.message.add({
            severity: 'error', summary: 'توجه', detail: 'ارتباط با سرور مقدور نمی باشد'
          });

          this.router.navigate(['login']);
          console.log('error');
          return false;
        }
      );
*/
