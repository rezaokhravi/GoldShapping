import { Component, OnInit } from '@angular/core';
import { ICustomer} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {MessageService} from "primeng/api";
import {CustomersService} from "../../../services/customers.service";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class CustomersComponent implements OnInit {
  customers: ICustomer[]=[];
  selectedCustomers: ICustomer[]=[];
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public customerService:CustomersService
  ) { }

  ngOnInit(): void {

    this.refresh();

  }

  refresh() {
    this.loading = true;
    this.customerService.getAllCustomer()
      .subscribe(res => {
        if (res.isSuccess) {
          this.customers = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        }
      }, error => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در سرویس بروزرسانی مشتری!!!',
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


  editCustomer(customer:ICustomer) {
    this.dialogService.open(EditCustomerComponent, {
      data: {
        customer:customer
      },
      header: 'ویرایش مشتری',
      width: '90%'
    }).onClose.subscribe((value:ICustomer) => {
      if (value){

        this.loading = true;
        this.customerService.editCustomer(value)
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
              summary: 'خطا در سرویس ویرایش مشتری!!!',
              detail: error.message
            });
          });

      }
    });
  }

  deleteCustomer(customer:ICustomer) {
    let title: string = `آیا می خواهید مشتری ${customer.NAME} ${customer.FAMILY}  حذف شود ؟  `;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی مشتری نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.customerService.deleteCustomer(customer)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف مشتری',
                  html: ` مشتری ${customer.NAME} ${customer.FAMILY}  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف مشتری!!!', detail: error.message});
          });
      }
    });
  }


  createCustomer(){
    this.dialogService.open(EditCustomerComponent, {
      data: {
        customer:null
      },
      header: 'ایجاد مشتری',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.customerService.addCustomer(value)
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
              summary: 'خطا در سرویس ایجاد مشتری!!!',
              detail: error.message
            });
          });
      }
    });
  }
}
