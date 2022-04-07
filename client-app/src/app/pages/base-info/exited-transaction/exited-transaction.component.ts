import { Component, OnInit } from '@angular/core';
import {IExitedTransaction, IGood} from "../../../models/data-models";
import {Table} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {fadeInOnEnterAnimation} from "angular-animations";
import {MessageService} from "primeng/api";
import {EditExitedTransactionComponent} from "./edit-exited-transaction/edit-exited-transaction.component";
import {ExitedTransactionService} from "../../../services/exited-transaction.service";

@Component({
  selector: 'app-exited-transaction',
  templateUrl: './exited-transaction.component.html',
  styleUrls: ['./exited-transaction.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class ExitedTransactionComponent implements OnInit {
  goods: IGood[] = [];
  selectedGood: IGood = {};
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public exitedTransactionService: ExitedTransactionService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.exitedTransactionService.getAllExitedTransaction().subscribe(res => {
      if (res.isSuccess) {
        this.goods = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی موجودی!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  edit(exitedTransaction:IExitedTransaction) {
    const ref = this.dialogService.open(EditExitedTransactionComponent, {
      data: {
        exitedTransaction:exitedTransaction
      },
      header: 'ویرایش موجودی',
      width: '90%'
    }).onClose.subscribe((value:IGood) => {
      if (value) {
        this.loading = true;
        this.exitedTransactionService.editExitedTransaction(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش موجودی!!!', detail: error.message});
        });
      }
    });
  }

  delete(exitedTransaction:IExitedTransaction) {
    let title: string = `آیا می خواهید ردیف انتخابی حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this.exitedTransactionService.deleteExitedTransaction(exitedTransaction)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف موجودی',
                  html: `با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف موجودی!!!', detail: error.message});
          });
      }
    });
  }

  createGood() {
    const ref = this.dialogService.open(EditExitedTransactionComponent, {
      data: {
        good:null
      },
      header: 'افزودن موجودی',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        debugger;
        this.exitedTransactionService.addExitedTransaction(value)
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس افزودن موجودی!!!', detail: error.message});
          });
      }
    });
  }
}
