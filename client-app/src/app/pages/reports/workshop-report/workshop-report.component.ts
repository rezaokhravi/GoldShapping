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


@Component({
  selector: 'app-workshop-report',
  templateUrl: './workshop-report.component.html',
  styleUrls: ['./workshop-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class WorkshopReportComponent implements OnInit {
  loading: boolean=false;
  reports: any[]=[];
  goods: any[]=[];
  selectedGoodId: any;
  exchangeTypes:  any[]=[];
  selectedExchangeTypesId: any;
  storage: any[]=[];
  customers: any[] = [];
  filterCustomer: any[] = [];
  selectedCustomer: any;
  selectedStorage: any;
  transactionId: any;
  customerId: any;
  enTransferType= enTransferType;
  display: boolean=false;
  datePickerConfig :any=DatePickerConfig;
  toDate: any;
  fromDate: any;
  workshopCode: any;

  constructor(
    public reportService: ReportsService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public goodService: GoodsService,
    public storageService:StorageService,
    public customerService:CustomersService,
  ) {
  }

  ngOnInit(): void {

    this.exchangeTypes=[
      {label:'????????',value:enExchangeType.purchase},
      {label:'????????',value:enExchangeType.sale},
      {label:'??????????',value:enExchangeType.advice},
    ];

    this.customerService.getFullTitle().subscribe(res => {
      if (res.isSuccess) {
        this.customers = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: '?????? ???? ?????????? ?????? ?????????? ????!!!', detail: error.message});
    });

    this.goodService.getGoodTitle().subscribe(res => {
      if (res.isSuccess) {
        this.goods = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: '?????? ???? ?????????? ?????? ???????? ????!!!', detail: error.message});
    });

    this.storageService.getStorageTitle().subscribe(res => {
      if (res.isSuccess) {
        this.storage = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: '?????? ???? ?????????? ?????? ?????????? ????!!!', detail: error.message});
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

    let filter={
      exchangeType:this.selectedExchangeTypesId||null,
      storageId:this.selectedStorage||null,
      goodId:this.selectedGoodId||null,
      customerId:this.selectedCustomer?.value||null,
      fromDates: this.fromDate || null,
      toDates: this.toDate || null,
      workshopCode:this.workshopCode||null
    }

    this.reportService.getWorkshopReport(filter).subscribe(res => {
      if (res.isSuccess) {
        this.reports = res.data;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: '?????? ???? ?????????? ?????????????????? ??????????!!!', detail: error.message});
    });
  }

  payments(report: any) {
    this.transactionId = report.ID;
    this.customerId = report.CUSTOMER_ID;

    this.display=!this.display;
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
}
