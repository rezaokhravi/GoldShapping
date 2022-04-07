import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {IUser} from "../../../../models/data-models";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {MessageService} from "primeng/api";
import {UserPermissionService} from "../../../../services/user-permission.service";
import {Table} from "primeng/table";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {EditPermissionComponent} from "./edit-permission/edit-permission.component";

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class UserPermissionComponent implements OnInit {

  user: IUser = {};
  permissions: any[]=[];
  selectedPermission: any;
  loading: boolean=false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    public messageService: MessageService,
    public permissionService:UserPermissionService
  ) {

  }


  ngOnInit(): void {
    if (this.config.data.user) {
      this.user = JSON.parse(JSON.stringify(this.config.data.user));
      this.refresh(this.user );
    }

  }

  refresh(user: IUser) {
    this.loading = true;
    // @ts-ignore
    this.permissionService.getAllPermissionByUserId(user.ID).subscribe(res => {
      if (res.isSuccess) {
        this.permissions = res.data;
        this.loading = false;
      } else {
        this.permissions=[];
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی مجوز!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event: any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }


  createPermission() {
    this.dialogService.open(EditPermissionComponent, {
      data: {
        permission: null,
        user:this.user
      },
      header: 'ایجاد مجوز',
      width: '80%'
    }).onClose.subscribe(value => {
      if (value) {
        this.loading = true;
        this.permissionService.addPermission(value)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh(this.user);
              this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد مجوز!!!', detail: error.message});
          });
      }
    });
  }

  editPermission(userPermission:any) {
    this.dialogService.open(EditPermissionComponent, {
      data: {
        permission: userPermission,
        user:this.user
      },
      header: 'ویرایش مجوز',
      width: '60%'
    }).onClose.subscribe((value: IUser) => {
      if (value) {
        this.loading = true;
        // @ts-ignore
        this.permissionService.editPermission(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh(this.user);
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش مجوز!!!', detail: error.message});
        });
      }
    });
  }

  deletePermission(userPermission:any) {
    let title: string = `آیا می خواهید مجوز ${userPermission.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی کاربر نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.permissionService.deletePermission(userPermission)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh(this.user);
              Swal.fire({
                  title: 'حذف مجوز',
                  html: `${userPermission.TITLE}  با موفقیت حذف گردید.`,
                  icon: 'success',
                  confirmButtonText: 'تایید',
                }
              )
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف مجوز!!!', detail: error.message});
          });
      }
    });
  }
}
