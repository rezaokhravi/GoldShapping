import { Component, OnInit } from '@angular/core';
import {IWholesaler} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import {EditWholesalerComponent} from "./edit-wholesaler/edit-wholesaler.component";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";
import {WholesalersService} from "../../../services/wholesalers.service";

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler.component.html',
  styleUrls: ['./wholesaler.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class WholesalerComponent implements OnInit {
  wholesalers: IWholesaler[]=[];
  selectedWholesaler: IWholesaler={};
  loading: boolean=false;

  constructor(
    public wholesalersServices:WholesalersService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.wholesalersServices.getAllWholesaler()
      .subscribe(res => {
        if (res.isSuccess) {
          this.wholesalers = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        }
      }, error => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در سرویس بروزرسانی بنکدار!!!',
          detail: error.message
        });
      })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editWholesaler(wholesaler:IWholesaler) {
     this.dialogService.open(EditWholesalerComponent, {
      data: {
        wholesaler:wholesaler
      },
      header: 'ویرایش بنکدار',
      width: '90%'
    }).onClose.subscribe((value:IWholesaler) => {
      if (value){
        this.loading = true;
        this.wholesalersServices.editWholesaler(value)
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
            this.messageService.add({
              severity: 'error',
              summary: 'خطا در سرویس ویرایش بنکدار!!!',
              detail: error.message
            });
          });
      }
    });
  }

  deleteWholesaler(wholesaler:IWholesaler) {
    let title: string = `آیا می خواهید بنکدار ${wholesaler.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی بنکدار نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this.wholesalersServices.deleteWholesaler(wholesaler)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف بنکدار',
                  html: ` بنکدار ${wholesaler.TITLE}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف بنکدار!!!', detail: error.message});
          });
      }
    });
  }

  createWholesaler() {
    const ref = this.dialogService.open(EditWholesalerComponent, {
      data: {
        wholesaler:null
      },
      header: 'ایجاد بنکدار',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.wholesalersServices.addWholesaler(value)
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
            this.messageService.add({
              severity: 'error',
              summary: 'خطا در سرویس ایجاد بنکدار!!!',
              detail: error.message
            });
          });
      }
    });
  }

}
