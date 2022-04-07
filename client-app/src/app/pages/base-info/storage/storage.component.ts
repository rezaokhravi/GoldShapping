import { Component, OnInit } from '@angular/core';
import {IStorage} from "../../../models/data-models";
import {Table} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {EditStorageComponent} from "./edit-storage/edit-storage.component";
import {fadeInOnEnterAnimation} from "angular-animations";
import {StorageService} from "../../../services/storage.service";
import {GoodsService} from "../../../services/goods.service";
import {MessageService} from "primeng/api";
import {ExitedTransactionComponent} from "../exited-transaction/exited-transaction.component";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class StorageComponent implements OnInit {
  storage: IStorage[] = [];
  selectedStorage: IStorage = {};
  loading: boolean = false;

  constructor(

    public dialogService: DialogService,
    public storageService :StorageService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  this.refresh();
  }

  refresh() {
    this.loading = true;
    this.storageService.getAllStorage().subscribe(res => {
      if (res.isSuccess) {
        this.storage = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی انبار!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editStorage(storage:IStorage) {
    this.dialogService.open(EditStorageComponent, {
      data: {
        storeroom:storage
      },
      header: 'ویرایش انبار',
      width: '90%'
    }).onClose.subscribe((value:IStorage) => {
      if (value){
        this.loading = true;
        this.storageService.editStorage(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش انبار!!!', detail: error.message});
        });
      }
    });
  }

  deleteStorage(storage:IStorage) {
    let title: string = `آیا می خواهید انبار ${storage.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی انبار نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this.storageService.deleteStorage(storage)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف انبار',
                  html: ` انبار ${storage.TITLE}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف انبار!!!', detail: error.message});
          });


      }
    });
  }

  createStorage() {
    this.dialogService.open(EditStorageComponent, {
      data: {
        storeroom:null
      },
      header: 'ایجاد انبار',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.storageService.addStorage(value)
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد انبار!!!', detail: error.message});
          });
      }
    });
  }

  motionStorage() {
     this.dialogService.open(ExitedTransactionComponent, {
      data: {},
      header: 'جا به جایی بین انبارها',
      width: '70%'
    }).onClose.subscribe(value=>{});
  }
}
