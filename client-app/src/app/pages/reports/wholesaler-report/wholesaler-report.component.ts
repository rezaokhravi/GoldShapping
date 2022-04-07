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
import {enExchangeType, enTransferType} from "../../../domains/daomins";
import {WholesalersService} from "../../../services/wholesalers.service";
import {StorageService} from "../../../services/storage.service";
import {PaymentReportComponent} from "../payment-report/payment-report.component";


@Component({
  selector: 'app-wholesaler-report',
  templateUrl: './wholesaler-report.component.html',
  styleUrls: ['./wholesaler-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class WholesalerReportComponent implements OnInit {
  loading: boolean=false;
  reports: any[]=[];
  goods: any[]=[];
  selectedGoodId: any;
  exchangeTypes:  any[]=[];
  selectedExchangeTypesId: any;
  selectedStorage: any;
  storage: any[]=[];
  transactionId: any;
  customerId: any;
  enTransferType= enTransferType;
   display: boolean=false;


  constructor(
    public reportService: ReportsService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public goodService: GoodsService,
    public storageService:StorageService,
  ) {
  }

  ngOnInit(): void {

    this.exchangeTypes=[
      {label:'خرید',value:enExchangeType.purchase},
      {label:'فروش',value:enExchangeType.sale},
      {label:'سفارش',value:enExchangeType.advice},
    ];

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

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  refresh() {
    this.loading = true;

    let filter={
      exchangeType:this.selectedExchangeTypesId||null,
      storageId:this.selectedStorage||null,
      goodId:this.selectedGoodId||null
    }

    this.reportService.getWholesalerReport({filter}).subscribe(res => {
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
