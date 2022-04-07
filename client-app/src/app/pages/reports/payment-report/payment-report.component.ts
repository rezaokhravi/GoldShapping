import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {enExchangeType, enTransferType} from 'src/app/domains/daomins';
import {DomainsService} from "../../../services/domains.service";
import {PaymentsService} from 'src/app/services/payments.service';
import {CashesService} from "../../../services/cashes.service";
import {Table} from "primeng/table";
import {ICash, IPayment} from "../../../models/data-models";

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class PaymentReportComponent implements OnInit {


  report: any;
  enExchangeType = enExchangeType;
  paymentDomExchangeTypes: number = enExchangeType.receive;
  behalfType: any[] = [];
  paymentType: any[] = [];
  cashes: any[] = [];
  loading: boolean = false;
  payment: any[] = [];
  selected: any;


  constructor(
    public paymentService: PaymentsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
  ) {

  }

  ngOnInit(): void {
    if (this.config.data.report) {
      this.report = JSON.parse(JSON.stringify(this.config.data.report));
      this.refresh();
    }
  }

  refresh() {
    this.loading = true;
    this.payment = [];
    this.paymentService.getPaymentByTransactionId(this.report.ID)
      .subscribe(res => {
        if (res.isSuccess) {
          this.payment = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        }
      }, error => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در سرویس بروزرسانی لیست تراکنش ها!!!',
          detail: error.message
        });
      })
  }

  search(event: any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }



}
