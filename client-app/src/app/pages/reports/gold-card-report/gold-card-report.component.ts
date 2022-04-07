import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'

import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import { DomainsService } from 'src/app/services/domains.service';
import {ReportsService} from "../../../services/reports.service";
import {Table} from "primeng/table";
import {CustomersService} from "../../../services/customers.service";
import {DatePickerConfig, enTransferType} from "../../../domains/daomins";
import {PaymentReportComponent} from "../payment-report/payment-report.component";


@Component({
  selector: 'app-gold-card-report',
  templateUrl: './gold-card-report.component.html',
  styleUrls: ['./gold-card-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class GoldCardReportComponent implements OnInit {
  loading: boolean=false;
  reports: any[]=[];
  fromDate: any;
  toDate: any;
  fromPrice: any;
  toPrice: any;
  selectedCustomer: any;
  customers: any[] = [];
  filterCustomer: any[] = [];
  goldCardType: any[] = [];
  selectGoldType: any;
  datePickerConfig: any;
  transactionId: any;
  customerId: any;
  enTransferType= enTransferType;
  display: boolean=false;
  customerCode: any;


  constructor(
    public reportService: ReportsService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public customerService:CustomersService,
  ) {
    this.datePickerConfig =DatePickerConfig
  }

  ngOnInit(): void {

    this.domainsService.getGoldAccountType().subscribe(res => {
      if (res.isSuccess) {
        this.goldCardType = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع سفارش!!!', detail: error.message});
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
  }


  searchCustomer(event: { query: any; }) {

    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );

  }

  clear(table: Table) {
    table.clear();
  }

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  refresh() {
    this.loading = true;
    let filter = {
      customerId: this.selectedCustomer?.value || null,
      fromDates: this.fromDate || null,
      toDates: this.toDate || null,
      fromPrice:this.fromPrice||null,
      toPrice:this.toPrice||null,
      goldAccountType:this.selectGoldType||null,
      customerCode:this.customerCode||null
    }

    this.reportService.getGoldCardReport(filter).subscribe(res => {
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
