import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'

import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import { DomainsService } from 'src/app/services/domains.service';
import {VariablesService} from "../../services/variables.service";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {MemoryStorageService} from "../../services/memory-storage.service";
import {Router} from "@angular/router";
import { ICurrentUser } from 'src/app/models/data-models';
import {EncodeService} from "../../services/encode.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class LoginComponent implements OnInit {

  loginForm:FormGroup;
   isLoader: boolean=false;

  constructor(
    public variablesService:VariablesService,
    public auth:AuthService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public cookie: CookieService,
    public storage: MemoryStorageService,
    public router: Router,
    private enCode:EncodeService,
  ) {
    this.variablesService.showLogin.next(true);
    this.loginForm = new FormGroup({
      USER: new FormControl({value: null, disabled: false}, Validators.required),
      PASSWORD: new FormControl({value: null, disabled: false}, Validators.required),
    });

  }

  ngOnInit(): void {


  }

  onSubmit() {
    if (this.loginForm.valid ) {
      this.isLoader = true;
      this.variablesService.displayFloatLoading.next(true);
      this.auth.loginUser(this.loginForm.getRawValue()).subscribe(result => {
        if (result.isSuccess){
          let token = result.data[0].TOKEN;
          // @ts-ignore
          this.cookie.set('token', token, 1);

          let user:ICurrentUser =  this.enCode.decryptData(token);
          this.variablesService.showLogin.next(false);
          this.auth.setCurrentUser(user).then(value => {
            if (this.auth.getUrlState()!=null) {
              this.router.navigateByUrl(this.auth.getUrlState());
              this.variablesService.displayFloatLoading.next(false);
            } else {
              this.router.navigate(['dashbord']);
              this.variablesService.displayFloatLoading.next(false);
            }
          });
        }else {
          this.messageService.add({severity: 'warn', summary: 'توجه', detail: result.faMessage});
          this.auth.logout();
          this.isLoader = false;
          this.variablesService.displayFloatLoading.next(false);
        }
      }, error => {
        this.messageService.add({severity: 'warn', summary: 'توجه', detail: 'نام کاربر یا رمز عبور اشتباه می باشد.'});
        this.auth.logout();
        this.isLoader = false;
        this.variablesService.displayFloatLoading.next(false);
      });
    }
  }



}
