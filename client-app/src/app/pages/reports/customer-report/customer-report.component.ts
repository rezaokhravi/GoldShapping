import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'

import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from 'src/app/services/domains.service';
import {ReportsService} from "../../../services/reports.service";
import {Table} from "primeng/table";
import {CustomersService} from "../../../services/customers.service";
import {GoodsService} from "../../../services/goods.service";
import {DatePickerConfig, enExchangeType, enTransferType} from "../../../domains/daomins";
import {StorageService} from "../../../services/storage.service";
import {TransactionService} from "../../../services/transaction.service";
import {environment} from "../../../../environments/environment";
import {IReportDataSource} from "../../../models/data-models";
import {CookieService} from "ngx-cookie-service";
import {EncodeService} from "../../../services/encode.service";




@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class CustomerReportComponent implements OnInit {

  @Input() isPopup:boolean=false;

  @Output() transaction= new EventEmitter();
  @Output() closeMe = new EventEmitter();

  loading: boolean = false;
  reports: any[] = [];
  goods: any[] = [];
  selectedGoodId: any;
  fromDate: any;
  toDate: any;
  selectedCustomer: any;
  customers: any[] = [];
  filterCustomer: any[] = [];
  enExchangeTypes = enExchangeType;
  exchangeTypes: any[] = [];
  selectedExchangeTypesId: any;
  config: any;
  selectedStorage: any;
  storage: any[] = [];
  datePickerConfig: any;
  display: boolean=false;
  transactionId: any;
  customerId: any;
  enTransferType= enTransferType;
  selectedTransaction: any;
   reportSetting:IReportDataSource ;



  constructor(
    public reportService: ReportsService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public customerService: CustomersService,
    public goodService: GoodsService,
    public storageService: StorageService,
    public transactionService: TransactionService,
    public cookie: CookieService,
    public enCode: EncodeService,
  ) {
    this.datePickerConfig = DatePickerConfig
  }

  ngOnInit(): void {


    this.exchangeTypes = [
      {label: 'خرید', value: enExchangeType.purchase},
      {label: 'فروش', value: enExchangeType.sale},
      {label: 'سفارش', value: enExchangeType.advice},
    ];

    this.customerService.getFullTitle().subscribe(res => {
      if (res.isSuccess) {
        this.customers = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
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

    this.storageService.getStorageTitle().subscribe(res => {
      if (res.isSuccess) {
        this.storage = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام انبار ها!!!', detail: error.message});
    });

  }


  clear(table: Table) {
    table.clear();
  }

  searchCustomer(event: { query: any; }) {

    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );

  }

  search(event: any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  refresh() {
    this.loading = true;

    let filter = {
      exchangeType: this.selectedExchangeTypesId || null,
      customerId: this.selectedCustomer?.value || null,
      storageId: this.selectedStorage || null,
      goodId: this.selectedGoodId || null,
      fromDates: this.fromDate || null,
      toDates: this.toDate || null
    }

    this.reportService.getCustomerReport(filter).subscribe(res => {
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

  selectedToDate(event: any = []) {
    if (event.length > 0) {
      this.toDate = event[0].format('jYYYY/jMM/jDD');
    } else {
      this.toDate = null;
    }
  }

  selectedFromDate(event: any = []) {
    if (event.length > 0) {
      this.fromDate = event[0].format('jYYYY/jMM/jDD');
    } else {
      this.fromDate = null;
    }
  }

  payments(report: any) {
    if (report.SHOW_BTN_PAYMENT==1){
      this.transactionId = report.ID;
      this.customerId = report.CUSTOMER_ID;
      this.display=!this.display;
    }else{
      this.messageService.add({severity: 'info', summary: 'امکان پرداخت برای رکورد انتخابی  نمی باشد!!!'});
    }

  }

  selectedRow(event: any) {
    if (event?.data&&this.isPopup==true){
      this.transaction.emit(event.data);
      this.closeMe.emit(true);
    }

  }

  print(report) {
    if (report.ID) {
      try {
        this.reportSetting = {
          name:'factorReport',
          title:'فاکتور',
          params:[{
            name:'transactionId',value:report.ID
          }],
          reportType:'view',
          token :this.cookie.get('token'),
          backToPreview:false
        }

        const reportDate = this.enCode.encryptData(this.reportSetting);
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = `${environment.reportUrl}#/reports/${encodeURIComponent(reportDate)}`;
        link.setAttribute('visibility', 'hidden');
        link.click();
      } catch (e) {
        console.error(e);
      }
    }
  }
}
