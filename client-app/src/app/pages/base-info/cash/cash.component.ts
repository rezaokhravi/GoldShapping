import { Component, OnInit } from '@angular/core';
import {ICash} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import {EditCashComponent} from "./edit-cash/edit-cash.component";
import Swal from "sweetalert2";
import {CashesService} from "../../../services/cashes.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class CashComponent implements OnInit {
  cashes: ICash[]=[];
  selectedCash: ICash={};
  loading: boolean=false;

  constructor(
    public messageService: MessageService,
    public cashesService:CashesService,
    public dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.cashesService.getAllCash().subscribe(res => {
      if (res.isSuccess) {
        this.cashes = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی صندوق!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editCash(cash:ICash) {
    this.dialogService.open(EditCashComponent, {
      data: {
        cash:cash
      },
      header: 'ویرایش صندوق',
      width: '90%'
    }).onClose.subscribe((value:ICash) => {
      if (value){
        this.loading = true;
        this.cashesService.editCash(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش صندوق!!!', detail: error.message});
        });
      }
    });
  }

  deleteCash(cash:ICash) {
    let title: string = `آیا می خواهید صندوق ${cash.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی صندوق نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.cashesService.deleteCash(cash)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف صندوق',
                  html: ` صندوق ${cash.TITLE}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف صندوق!!!', detail: error.message});
          });

      }
    });
  }

  createCash() {
    this.dialogService.open(EditCashComponent, {
      data: {
        cash:null
      },
      header: 'ایجاد صندوق',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.cashesService.addCash(value)
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد صندوق!!!', detail: error.message});
          });
      }
    });
  }
}
