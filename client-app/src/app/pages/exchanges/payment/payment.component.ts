import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {enExchangeType, enTransferType} from 'src/app/domains/daomins';
import {DomainsService} from "../../../services/domains.service";
import {PaymentsService} from 'src/app/services/payments.service';
import {CashesService} from "../../../services/cashes.service";
import {Table} from "primeng/table";
import {ICash, IPayment, IReportDataSource} from "../../../models/data-models";
import {EncodeService} from "../../../services/encode.service";
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class PaymentComponent implements OnInit {



  paymentForm: FormGroup;
  enTransferType = enTransferType;
  behalfType: any[] = [];
  paymentType: any[] = [];
  cashes: any[] = [];
  loading: boolean = false;
  payments: any[] = [];
  selected: any;
  isLoading: boolean = false;
  accountResidual: number = 0;
  accountResidualChanges: number = 0;
  skeletonBehalfType: boolean = true;
  skeletonPaymentType: boolean = true;
  skeletonCashes: boolean = true;
  skeletonAccountResidual: boolean = true;
  price: number;
  reportSetting: IReportDataSource;
  @Input() transactionId: any;
  @Input() customerId: any;
  @Input() paymentDomTransferType: any=this.enTransferType.receive;
  @Output() closeMe = new EventEmitter();



  constructor(
    public paymentService: PaymentsService,
    public enCode: EncodeService,
    public domainsService: DomainsService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public cashService: CashesService,
    private cookie: CookieService,
    public auth:AuthService
  ) {
    this.paymentForm = new FormGroup({
      TRANSACTION_ID: new FormControl({value: Number(this.transactionId), disabled: false}, Validators.required),
      CUSTOMER_ID: new FormControl({value: this.customerId, disabled: false}, Validators.required),
      DOM_ID_TRANSFER_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_PAYMENT_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_BEHALF_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      PRICE: new FormControl({value: null, disabled: false}),
      CASH_ID: new FormControl({value: null, disabled: false}, Validators.required),
      ACCOUNT_RESIDUAL: new FormControl({value: null, disabled: false}),
      DESCRIPTION: new FormControl({value: null, disabled: false}),
      IS_SETTLE: new FormControl({value: 0, disabled: false}),
      USE_ID_CREATOR:new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),
    });
  }

  ngOnInit(): void {

    this.paymentForm.controls['TRANSACTION_ID'].patchValue(this.transactionId);
    this.paymentForm.controls['CUSTOMER_ID'].patchValue(this.customerId);
    this.paymentForm.controls['DOM_ID_TRANSFER_TYPE'].patchValue(this.paymentDomTransferType);

    this.paymentService.getFnAccountResidual(this.transactionId, this.customerId).subscribe(res => {
      if (res.isSuccess) {
        this.paymentForm.controls['PRICE'].patchValue(res.data[0].ACCOUNT_RESIDUAL);
        this.price=res.data[0].ACCOUNT_RESIDUAL;
        this.paymentForm.controls['ACCOUNT_RESIDUAL'].patchValue(res.data[0].ACCOUNT_RESIDUAL);
        this.accountResidualChanges = JSON.parse(JSON.stringify(res.data[0].ACCOUNT_RESIDUAL)) ;
        this.accountResidual =JSON.parse(JSON.stringify(res.data[0].ACCOUNT_RESIDUAL));
        this.paymentForm.controls['IS_SETTLE'].patchValue(this.accountResidualChanges<=0?1:0);
        this.skeletonAccountResidual = false;
        this.changeAccountResidual(res.data[0].ACCOUNT_RESIDUAL);
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonAccountResidual = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس مانده حساب!!!', detail: error.message});
      this.skeletonAccountResidual = false;
    });

    this.domainsService.getBehalfType().subscribe(res => {
      if (res.isSuccess) {
        this.behalfType = res.data;
        this.skeletonBehalfType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonBehalfType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بابت!!!', detail: error.message});
      this.skeletonBehalfType = false;
    });

    this.domainsService.getPaymentType().subscribe(res => {
      if (res.isSuccess) {
        this.paymentType = res.data;
        this.skeletonPaymentType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonPaymentType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع پرداخت!!!', detail: error.message});
      this.skeletonPaymentType = false;
    });

    this.cashService.getCashTitle().subscribe(res => {
      if (res.isSuccess) {
        this.cashes = res.data;
        this.skeletonCashes = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonCashes = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام صندوق!!!', detail: error.message});
      this.skeletonCashes = false;
    });

    this.refresh();

  }

  closeFrom() {
    this.closeMe.emit(true);
  }

  onSavePayment() {

    if (this.paymentForm.valid){
    this.isLoading = true;
    let payment = this.paymentForm.getRawValue();
    payment.ACCOUNT_RESIDUAL = this.accountResidualChanges;
    payment.IS_SETTLE = this.accountResidualChanges<=0?1:0;
    this.paymentService.addPayment(payment).subscribe(res => {
      if (res.isSuccess) {
        this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
        this.isLoading = false;
        this.ngOnInit();
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.isLoading = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد تراکنش ها!!!', detail: error.message});
      this.isLoading = false;
    });
    }
  }

  refresh() {

    this.isLoading = false;
    this.loading = true;
    this.payments = [];
    this.paymentService.getPaymentByTransactionId(this.transactionId).subscribe(res => {
      if (res.isSuccess) {
        this.payments = res.data;
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

  delete(payment: any) {
    let title: string = `آیا می خواهید تراکنش حذف شود ؟`;
    this.loading = false;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی تراکنش نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.paymentService.deletePayment(payment)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف تراکنش',
                  html: ` تراکنش  با موفقیت حذف گردید.`,
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
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف تراکنش!!!', detail: error.message});
          });

      }
    });
  }

  print() {
    if (this.transactionId) {
      try {
        this.reportSetting = {
          name:'factorReport',
          title:'فاکتور',
          params:[{
            name:'transactionId',value:this.transactionId
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

  changeAccountResidual(value: any) {

    if (this.paymentDomTransferType == enTransferType.receive) {
       this.accountResidualChanges = this.accountResidual + value;
    } else {
      this.accountResidualChanges = this.accountResidual - value;
    }
  }

}
