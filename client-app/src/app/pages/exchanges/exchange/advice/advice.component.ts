import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'

import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomer, ITransaction} from "../../../../models/data-models";
import {TransactionService} from "../../../../services/transaction.service";
import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";
import {DatePickerConfig, enExchangeType, enGoldType, enOrderType} from "../../../../domains/daomins";
import {CustomersService} from 'src/app/services/customers.service';
import {GoodsService} from "../../../../services/goods.service";
import moment from "jalali-moment";
import {VariablesService} from "../../../../services/variables.service";
import {AuthService} from "../../../../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-exchange-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class AdviceComponent implements OnInit {

  @Input() domIdExchangeType: number = 0;
  @Input() domIdAccountType: number = 0;

  isSave: boolean = false;
  display: boolean = false;
  adviceForm: FormGroup;
  enOrderType = enOrderType;
  domOrderType: any[] = [];
  domGemType: any[] = [];
  domOrderModel: any[] = [];
  domReceivedStatement: any[] = [];
  customers: any[] = [];
  goldType: any[] = [];
  filterCustomer: any[] = [];
  behalfType: any[] = [];
  paymentType: any[] = [];
  cashes: any[] = [];
  domGoldAccountType: any[] = [];
  transactionId: number = 0;
  goods: any[] = [];
  customerID: any;
  customerId: number = 0;
  orderDate: any;
  datePickerConfig: any = DatePickerConfig;
  settlementDate: any;
  isLoading: boolean = false;
  totalAmount: number=0;

  skeletonDomOrderType: boolean = true;
  skeletonDomGemType: boolean = true;
  skeletonDomOrderModel: boolean = true;
  skeletonCustomers: boolean = true;
  skeletonGoods: boolean = true;
  skeletonGoldType: boolean = true;
  skeletonGoldAccountType: boolean = true;
  skeletonOrders: boolean = true;
  enGoldType = enGoldType;
  selectedOrderType: any;
  transaction:any={} ;
  loadingBtnPayment: boolean = false;
  orders: any[]=[];
  filterOrder: any[] = [];
  selectedOrder: any;
  displayCm: boolean = false;


  constructor(
    public domainsService: DomainsService,
    public customerService: CustomersService,
    public goodService: GoodsService,
    public transactionService: TransactionService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public auth:AuthService,
    public cookie: CookieService,
  ) {

    this.adviceForm = new FormGroup({
      ID:new FormControl({value: null, disabled: false}),
      DOM_ID_ORDER_TYPE: new FormControl({value: 1, disabled: false}, Validators.required),
      ORDER_DATE: new FormControl({
        value: moment().locale('fa').format('jYYYY/jMM/jDD'),
        disabled: true
      }, Validators.required),
      MANUAL_TOTAL_AMOUNT: new FormControl({value: false, disabled: false}),
      CUSTOMER_ID: new FormControl({value: null, disabled: false}, Validators.required),
      GOOD_ID: new FormControl({value: null, disabled: false}, Validators.required),
      ORDER_MODEL: new FormControl({value: null, disabled: false}),
      ORDER_CODE: new FormControl({value: null, disabled: false}),
      ORDER_SIZE: new FormControl({value: null, disabled: false}),
      DOM_ID_ORDER_GEM_TYPE: new FormControl({value: null, disabled: false}),
      ORDER_GEM_WEIGHT: new FormControl({value: null, disabled: false}),
      WORK_WEIGHT: new FormControl({value: null, disabled: false}),
      SETTLEMENT_DATE: new FormControl({value: null, disabled: false}),
      TOTAL_AMOUNT: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: this.domIdExchangeType, disabled: false}),
      DOM_ID_ACCOUNT_TYPE: new FormControl({value: this.domIdAccountType, disabled: false}),
      USE_ID_CREATOR:new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),
    });

    this.domainsService.getGoldAccountType().subscribe(res => {
      if (res.isSuccess) {
        this.domGoldAccountType = res.data;
        this.skeletonGoldAccountType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoldAccountType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع حساب طلا!!!', detail: error.message});
      this.skeletonGoldAccountType = false;
    });

    this.domainsService.getOrderType().subscribe(res => {
      if (res.isSuccess) {
        this.domOrderType = res.data;
        if (this.domOrderType.length > 0) {
          this.selectedOrderType = this.domOrderType[0].value;
        }
        this.skeletonDomOrderType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonDomOrderType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع سفارش!!!', detail: error.message});
      this.skeletonDomOrderType = false;
    });

    this.domainsService.getGemType().subscribe(res => {
      if (res.isSuccess) {
        this.domGemType = res.data;
        this.skeletonDomGemType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonDomGemType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع نگین!!!', detail: error.message});
      this.skeletonDomGemType = false;
    });

    this.domainsService.getOrderModel().subscribe(res => {
      if (res.isSuccess) {
        this.domOrderModel = res.data;
        this.skeletonDomOrderModel = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonDomOrderModel = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس مدل سفارش!!!', detail: error.message});
      this.skeletonDomOrderModel = false;
    });

    this.domainsService.getReceivedStatement().subscribe(res => {
      if (res.isSuccess) {
        this.domReceivedStatement = res.data;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع بیانه دریافتی!!!', detail: error.message});
    });

    this.customerService.getFullTitle().subscribe(res => {
      if (res.isSuccess) {
        this.customers = res.data;
        this.skeletonCustomers = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonCustomers = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
      this.skeletonCustomers = false;
    });

    this.transactionService.getOrderTitleAdvice().subscribe(res => {
      if (res.isSuccess) {
        this.orders = res.data;
        this.skeletonOrders = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonOrders = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس لیست سفارشات!!!', detail: error.message});
      this.skeletonOrders = false;
    });

    this.goodService.getGoodTitle().subscribe(res => {
      if (res.isSuccess) {
        this.goods = res.data;
        this.skeletonGoods = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoods = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام کالا ها!!!', detail: error.message});
      this.skeletonGoods = false;
    });

    this.domainsService.getGoldType().subscribe(res => {
      if (res.isSuccess) {
        this.goldType = res.data;
        this.skeletonGoldType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoldType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع طلا!!!', detail: error.message});
      this.skeletonGoldType = false;
    });

  }

  ngOnInit(): void {
    this.adviceForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.adviceForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

  }

  search(event: { query: any; }) {
    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );
  }

  searchOrder(event: { query: any; }) {
    this.filterOrder = this.orders.filter(item =>
      String(item.Full_TITLE).includes(event.query)
    );
  }

  onSaveTransaction() {
    this.isLoading = true;
    this.adviceForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.adviceForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);
    if (this.totalAmount != this.adviceForm.controls['TOTAL_AMOUNT'].value) {
      this.adviceForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(true);
    } else {
      this.adviceForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(false);
    }

    let date = this.adviceForm.getRawValue();
    date.ORDER_DATE = this.orderDate;
    date.SETTLEMENT_DATE = this.settlementDate;

    if (date.CUSTOMER_ID) {
      date.CUSTOMER_ID = date.CUSTOMER_ID.value;

    }

    this.transactionService.addTransaction(date).subscribe(res => {
      if (res.isSuccess) {
        this.transactionId = Number(res.data[0].ID);
        this.customerId = Number(res.data[0].CUSTOMER_ID);
        this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
        this.isSave = true;
        this.isLoading = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.isLoading = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس ذخیره سفارش!!!', detail: error.message});
      this.isLoading = false;
    });

  }

  resetFrom() {
    this.isSave = false;
    this.isLoading = false;
    this.adviceForm.reset({
      DOM_ID_EXCHANGE_TYPE: this.domIdExchangeType,
      DOM_ID_ACCOUNT_TYPE: this.domIdAccountType,
      MANUAL_TOTAL_AMOUNT: false,
      DOM_ID_ORDER_TYPE:this.selectedOrderType,
      ORDER_DATE: moment().locale('fa').format('jYYYY/jMM/jDD')
    });
  }

  selectedOrderDate(event: any = []) {
    if (event.length > 0) {
      this.orderDate = event[0].format('jYYYY/jMM/jDD');
    } else {
      this.orderDate = null;
    }
  }

  selectedSettlementDate(event: any) {
    if (event.length > 0) {
      this.settlementDate = event[0].format('jYYYY/jMM/jDD');
    } else {
      this.settlementDate = null;
    }
  }


  getOrderTransaction(event: any) {
    console.log('event:::',event);
            this.transaction = event;
            this.adviceForm.controls['ID'].patchValue(this.transaction.ID);
            this.adviceForm.controls['CUSTOMER_ID'].patchValue(this.customers.find(item => item.value == this.transaction.CUSTOMER_ID));
            this.adviceForm.controls['GOOD_ID'].patchValue(this.transaction.GOOD_ID);
            this.adviceForm.controls['ORDER_CODE'].patchValue(this.transaction.ORDER_CODE);
            this.adviceForm.controls['ORDER_MODEL'].patchValue(this.transaction.ORDER_MODEL);
            this.adviceForm.controls['ORDER_SIZE'].patchValue(this.transaction.ORDER_SIZE);
            this.adviceForm.controls['DOM_ID_ORDER_GEM_TYPE'].patchValue(this.transaction.DOM_ID_ORDER_GEM_TYPE);
            this.adviceForm.controls['ORDER_GEM_WEIGHT'].patchValue(this.transaction.ORDER_GEM_WEIGHT);
            this.adviceForm.controls['WORK_WEIGHT'].patchValue(this.transaction.WORK_WEIGHT);
            this.adviceForm.controls['TOTAL_AMOUNT'].patchValue(this.transaction.TOTAL_AMOUNT||0);

            if (this.transaction.ORDER_DATE) {
              console.log(this.transaction.ORDER_DATE);
              this.adviceForm.controls['ORDER_DATE'].patchValue(moment.from(this.transaction.ORDER_DATE,'fa','jYYYY/jMM/jDD'));
            } else {
              this.adviceForm.controls['ORDER_DATE'].patchValue(null);
            }

            if (this.transaction.SETTLEMENT_DATE) {
              this.adviceForm.controls['SETTLEMENT_DATE'].patchValue(moment.from(this.transaction.SETTLEMENT_DATE,'fa','jYYYY/jMM/jDD'));
            } else {
              this.adviceForm.controls['SETTLEMENT_DATE'].patchValue(null);
            }

            console.log('this.transaction::', this.transaction);

  }

  onchangeOrderType(event: any) {
    this.resetFrom();
  }

  showPayment() {
    if (this.customerId>0){
      this.loadingBtnPayment=true;
      this.transactionService
        .getCountSettleByCustomerId(this.customerId)
        .subscribe(res=>{
        if (res.isSuccess){
          if (res.data[0].CNT>1){
            this.messageService.add(
              {
                severity: 'info',
                summary: 'به دلیل باز بودن فاکتور قبلی ،امکان پرداخت برای این فاکتور نمی باشد.'
              });
            this.loadingBtnPayment=false;
          }
          else{
            this.display=true;
            this.loadingBtnPayment=false;
          }
        }else {
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          this.loadingBtnPayment=false;
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'خطا در سرویس نمایش تراکنش ها!!!', detail: error.message});
        this.loadingBtnPayment=false;
      })
    }else {
      this.messageService.add({severity: 'warn', summary: 'مشتری انتخاب نشده است !!!'});
    }
  }

  onCloseCustomer(event: any) {
    if (event) {
      this.skeletonCustomers = true;
      this.customerService.getFullTitle().subscribe(res => {
        if (res.isSuccess) {
          this.customers = res.data;
          this.skeletonCustomers = false;
        } else {
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          this.skeletonCustomers = false;
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
        this.skeletonCustomers = false;
      });
    }
    this.displayCm = !this.displayCm;
  }
}
