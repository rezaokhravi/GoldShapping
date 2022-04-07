import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'

import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import { DomainsService } from 'src/app/services/domains.service';
import {ReportsService} from "../../../services/reports.service";
import {Table} from "primeng/table";
import {GoodsService} from "../../../services/goods.service";
import {DatePickerConfig, enExchangeType, enTransferType} from "../../../domains/daomins";
import {CustomersService} from "../../../services/customers.service";
import {StorageService} from "../../../services/storage.service";
import {PaymentReportComponent} from "../payment-report/payment-report.component";
import {UsersService} from "../../../services/users.service";



@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class TransactionReportComponent implements OnInit {
  loading: boolean=false;
  reports: any[]=[];
  goods: any[]=[];
  selectedGoodId: any;
  fromDate: any;
  toDate: any;
  exchangeTypes:  any[]=[];
  selectedExchangeTypesId: any;
  accountType: any[]=[];
  selectAccountType: any;
  selectedStorage: any;
  storage: any[]=[];
  customers: any[] = [];
  selectedCustomer: any;
  datePickerConfig: any;
  filterCustomer: any[] = [];
  transactionId: any;
  customerId: any;
  enTransferType= enTransferType;
  display: boolean=false;
  users: any[] = [];
  selectedUser: any;


  constructor(
    public reportService: ReportsService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public goodService: GoodsService,
    public customerService:CustomersService,
    public storageService:StorageService,
    public userService:UsersService,
  ) {
    this.datePickerConfig =DatePickerConfig
  }

  ngOnInit(): void {

    this.exchangeTypes=[
      {label:'خرید',value:enExchangeType.purchase},
      {label:'فروش',value:enExchangeType.sale},
      {label:'سفارش',value:enExchangeType.advice},
    ];

    this.domainsService.getAccountType().subscribe(res => {
      if (res.isSuccess) {
        this.accountType = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع سفارش!!!', detail: error.message});
    });

    this.goodService.getGoodTitle().subscribe(res => {
      if (res.isSuccess) {
        this.goods = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام کالا ها!!!', detail: error.message});
    });


    this.customerService.getFullTitle().subscribe(res => {
      if (res.isSuccess) {
        this.customers = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
    });

    this.storageService.getStorageTitle().subscribe(res => {
      if (res.isSuccess) {
        this.storage = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام انبار ها!!!', detail: error.message});
    });

    this.userService.getUserFullName().subscribe(res => {
      if (res.isSuccess) {
        this.users = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام کاربری!!!', detail: error.message});
    });

  }


  clear(table: Table) {
    table.clear();
  }

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  searchCustomer(event: { query: any; }) {

    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );

  }

  refresh() {
    this.loading = true;

    let filter = {
      customerId: this.selectedCustomer?.value || null,
      fromDates: this.fromDate || null,
      toDates: this.toDate || null,
      exchangeType: this.selectedExchangeTypesId || null,
      storageId: this.selectedStorage || null,
      goodId: this.selectedGoodId || null,
      accountType:this.selectAccountType||null,
      userId:this.selectedUser||null
    }

    this.reportService.getTransactionReport(filter).subscribe(res => {
      if (res.isSuccess) {
        this.reports = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی گزارش!!!', detail: error.message});
    });
  }

  selectedToDate(event: any=[]) {
    if (event.length>0){
      this.toDate= event[0].format('jYYYY/jMM/jDD');
    }else {
      this.toDate=null;
    }
  }

  selectedFromDate(event: any=[]) {
    if (event.length>0){
      this.fromDate= event[0].format('jYYYY/jMM/jDD');
    }else {
      this.fromDate=null;
    }
  }

  payments(report: any) {
    this.transactionId = report.ID;
    this.customerId = report.CUSTOMER_ID;

    this.display=!this.display;

    /*
    this.dialogService.open(PaymentReportComponent, {
      data: {
        report: report
      },
      header: 'لیست تراکنش ها',
      width: '70%'
    }).onClose.subscribe((value: any) => {

    });
     */
  }
}
