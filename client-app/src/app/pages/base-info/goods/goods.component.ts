import { Component, OnInit } from '@angular/core';
import {IGood} from "../../../models/data-models";
import {Table} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {EditGoodComponent} from "./edit-good/edit-good.component";
import {fadeInOnEnterAnimation} from "angular-animations";
import {MessageService} from "primeng/api";
import {GoodsService} from "../../../services/goods.service";


@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class GoodsComponent implements OnInit {
  goods: IGood[] = [];
  selectedGood: IGood = {};
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public goodsService: GoodsService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.goodsService.getAllGood().subscribe(res => {
      if (res.isSuccess) {
        this.goods = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی کالا!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editGood(good:IGood) {
    const ref = this.dialogService.open(EditGoodComponent, {
      data: {
        good:good
      },
      header: 'ویرایش کالا',
      width: '90%'
    }).onClose.subscribe((value:IGood) => {
      if (value) {
        this.loading = true;
        this.goodsService.editGood(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش کالا!!!', detail: error.message});
        });
      }
    });
  }

  deleteGood(good:IGood) {
    let title: string = `آیا می خواهید کالای ${good.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی کالا نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this.goodsService.deleteGood(good)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف کالا',
                  html: ` کالا ${good.TITLE}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف کالا!!!', detail: error.message});
          });
      }
    });
  }

  createGood() {
    const ref = this.dialogService.open(EditGoodComponent, {
      data: {
        good:null
      },
      header: 'ایجاد کالا',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.goodsService.addGood(value)
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد کالا!!!', detail: error.message});
          });
      }
    });
  }
}
