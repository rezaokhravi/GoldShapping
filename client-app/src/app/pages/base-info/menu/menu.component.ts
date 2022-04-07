import { Component, OnInit } from '@angular/core';
import { IMenu} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import {EditMenuComponent} from "./edit-menu/edit-menu.component";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class MenuComponent implements OnInit {
  menu: IMenu[]=[];
  selectedMenu: IMenu={};
  loading: boolean=false;

  constructor(
    public messageService: MessageService,
    public menuService:MenuService,
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.menuService.getAllMenu().subscribe(res => {
      if (res.isSuccess) {
        this.menu = res.data;
        this.loading = false;
      } else {
        this.menu=[];
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی منو!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editMenu(menu:IMenu) {
    this.dialogService.open(EditMenuComponent, {
      data: {
        menu:menu
      },
      header: 'ویرایش منو',
      width: '90%'
    }).onClose.subscribe((value) => {
      if (value){
        this.loading = true;
        this.menuService.editMenu(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش منو!!!', detail: error.message});
        });
      }
    });
  }

  deleteMenu(menu:IMenu) {
    let title: string = `آیا می خواهید منو ${menu.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی منو نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.menuService.deleteMenu(menu)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف منو',
                  html: ` منو ${menu.TITLE}  با موفقیت حذف گردید.`,
                  icon: 'success',
                  confirmButtonText: 'تایید',
                }
              );
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف منو!!!', detail: error.message});
          });

      }
    });
  }

  createMenu() {
    this.dialogService.open(EditMenuComponent, {
      data: {
        cash:null
      },
      header: 'ایجاد منو',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.menuService.addMenu(value)
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد منو!!!', detail: error.message});
          });
      }
    });
  }
}
