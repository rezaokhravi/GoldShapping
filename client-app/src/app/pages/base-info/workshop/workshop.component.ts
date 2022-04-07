import {Component, OnInit} from '@angular/core';
import {IWorkshop} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {EditWorkshopComponent} from "./edit-workshop/edit-workshop.component";
import {MessageService} from "primeng/api";
import {WorkshopesService} from "../../../services/workshopes.service";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class WorkshopComponent implements OnInit {
  workshops: IWorkshop[] = [];
  selectedWorkshop: IWorkshop = {};
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public workshopService: WorkshopesService,
    public messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.workshopService.getAllWorkshop()
      .subscribe(res => {
        if (res.isSuccess) {
          this.workshops = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        }
      }, error => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در سرویس بروزرسانی فروشگاه!!!',
          detail: error.message
        });
      })
  }

  clear(table: Table) {
    table.clear();
  }


  search(event: any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editWorkshop(workshop: IWorkshop) {
    this.dialogService.open(EditWorkshopComponent, {
      data: {
        workshop: workshop
      },
      header: 'ویرایش کارگاه',
      width: '90%'
    }).onClose.subscribe((value: IWorkshop) => {
      if (value) {
        this.loading = true;
        this.workshopService.editWorkshop(value)
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
              summary: 'خطا در سرویس ویرایش کارگاه!!!',
              detail: error.message
            });
          });
      }
    });
  }

  deleteWorkshop(workshop: IWorkshop) {
    let title: string = `آیا می خواهید کارگاه ${workshop.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی کارگاه نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.workshopService.deleteWorkshop(workshop)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف کارگاه',
                  html: ` کارگاه ${workshop.TITLE}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف کارگاه!!!', detail: error.message});
          });
      }
    });
  }

  createWorkshop() {
    this.dialogService.open(EditWorkshopComponent, {
      data: {
        workshop: null
      },
      header: 'ایجاد کارگاه',
      width: '70%'
    }).onClose.subscribe(value => {
      if (value) {
        this.loading = true;
        this.workshopService.addWorkshop(value)
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
              summary: 'خطا در سرویس ایجاد کارگاه!!!',
              detail: error.message
            });
          });
      }
    });
  }

}
