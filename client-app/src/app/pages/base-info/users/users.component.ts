import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../models/data-models";
import {Table} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {EditUserComponent} from "./edit-user/edit-user.component";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation} from "angular-animations";
import {UsersService} from "../../../services/users.service";
import {MessageService} from "primeng/api";
import {UserPermissionComponent} from "./user-permission/user-permission.component";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  selectedUsers: IUser[] = [];
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public userService: UsersService,
    public messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.userService.getAllUser().subscribe(res => {
      if (res.isSuccess) {
        this.users = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی کاربر!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event: any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  deleteUser(user: IUser) {
    let title: string = `آیا می خواهید کاربر ${user.NAME} ${user.FAMILY}  حذف شود ؟`;
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
        this.userService.deleteUser(user)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف کاربر',
                  html: ` کاربر ${user.NAME} ${user.FAMILY}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف کاربر!!!', detail: error.message});
          });
      }
    });
  }

  createUser() {
    this.dialogService.open(EditUserComponent, {
      data: {
        user: null
      },
      header: 'ایجاد کاربر',
      width: '90%'
    }).onClose.subscribe(value => {
      if (value) {
        this.loading = true;
        this.userService.addUser(value)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد کاربر!!!', detail: error.message});
          });
      }
    });
  }

  editUser(user: IUser) {
    this.dialogService.open(EditUserComponent, {
      data: {
        user: user
      },
      header: 'ویرایش کاربر',
      width: '70%'
    }).onClose.subscribe((value: IUser) => {
      if (value) {
        this.loading = true;
        this.userService.editUser(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش کاربر!!!', detail: error.message});
        });
      }
    });
  }

  permissionUser(user: IUser) {
    this.dialogService.open(UserPermissionComponent, {
      data: {
        user: user
      },
      header: 'مجوز های کاربر',
      width: '70%'
    }).onClose.subscribe((value) => {
      if (value) {
        this.loading = true;
        this.refresh();
      }
    });
  }
}
