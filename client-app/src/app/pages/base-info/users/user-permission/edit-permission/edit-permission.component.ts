import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {MessageService} from "primeng/api";
import {IUserPermission} from "../../../../../models/data-models";
import {UsersService} from "../../../../../services/users.service";
import {MenuService} from "../../../../../services/menu.service";
import  * as moment from "jalali-moment";
import {UserPermissionService} from "../../../../../services/user-permission.service";
import {VariablesService} from "../../../../../services/variables.service";



@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    MessageService
  ]
})
export class EditPermissionComponent implements OnInit  {

  permission: IUserPermission = {};
  isNew: boolean = true;
  permissionFrom: FormGroup;
  users:any[]=[];
  menus:any[]=[];
  saveAndClear: boolean=false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public userService:UsersService,
    public menuService:MenuService,
    public permissionService:UserPermissionService,
    public messageService: MessageService,
  public variables:VariablesService,
  private fb: FormBuilder,
  ) {
    this.isNew = true;

    this.permissionFrom = this.fb.group(
      {
        MENU_ID: [null, Validators.required],
        USE_ID: [null, Validators.required],
        START_DATE_TIME: [null, Validators.required],
        END_DATE_TIME: [null, Validators.required],
        CAN_SELECT: [null,null],
        CAN_INSERT: [null,null],
        CAN_UPDATE: [null,null],
        CAN_DELETE: [null,null],
        DESCRIPTION: [null,null],
        saveAndClear: [this.saveAndClear,null],
      }
    );
  }



  ngOnInit(): void {

    this.userService.getUserFullName().subscribe(res => {
      if (res.isSuccess){
        this.users=res.data;
      }
    });

    this.menuService.getAllMenuTitle().subscribe(res => {
      if (res.isSuccess){
        this.menus=res.data;
      }
    });

    if (this.config.data.permission) {
      this.permission = JSON.parse(JSON.stringify(this.config.data.permission));
      this.isNew = false;
      console.log('this.permission',this.permission)
    }else {
      this.permission.START_DATE_TIME= moment().locale('fa').format('jYYYY/jMM/jDD');
      this.permission.END_DATE_TIME= moment().add(1,'year').locale('fa').format('jYYYY/jMM/jDD');
    }

    this.permission.USE_ID = this.config.data.user.ID;
  }

  saveUser() {
    if (this.permissionFrom.valid && this.saveAndClear===false) {
        this.ref.close(this.permission);
    }
    else if (this.permissionFrom.valid && this.saveAndClear===true) {
      this.variables.displayFloatLoading.next(true);
      if (this.isNew==true){
        this.permissionService.addPermission(this.permission)
          .subscribe(res => {
            if (res.isSuccess) {
              this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
              this.variables.displayFloatLoading.next(false);
            } else {
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
              this.variables.displayFloatLoading.next(false);
            }
          }, error => {
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد مجوز!!!', detail: error.message});
            this.variables.displayFloatLoading.next(false);
          });
      }else{
        this.permissionService.editPermission(this.permission)
          .subscribe(res => {
            if (res.isSuccess) {
              this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
              this.variables.displayFloatLoading.next(false);
            } else {
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
              this.variables.displayFloatLoading.next(false);
            }
          }, error => {
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش مجوز!!!', detail: error.message});
            this.variables.displayFloatLoading.next(false);
          });
      }
      debugger;
      let UserId = JSON.parse(JSON.stringify(this.permission.USE_ID));
      this.permission.USE_ID = UserId;
      this.permission.START_DATE_TIME= moment().locale('fa').format('jYYYY/jMM/jDD');
      this.permission.END_DATE_TIME= moment().add(1,'year').locale('fa').format('jYYYY/jMM/jDD');
      this.permissionFrom.reset({
        USE_ID: this.permission.USE_ID,
        START_DATE_TIME:this.permission.START_DATE_TIME,
        END_DATE_TIME:this.permission.END_DATE_TIME,
        saveAndClear:this.saveAndClear
      });
    }
  }
}
