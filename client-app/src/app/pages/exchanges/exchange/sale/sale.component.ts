import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../../../services/transaction.service";
import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";
import {CustomersService} from "../../../../services/customers.service";
import {GoodsService} from "../../../../services/goods.service";
import {StorageService} from "../../../../services/storage.service";
import {enGoldType, enTransferType} from "../../../../domains/daomins";
import {CookieService} from "ngx-cookie-service";
import {VariablesService} from "../../../../services/variables.service";
import {AuthService} from "../../../../services/auth.service";
import {Subscription} from "rxjs";
import {DataService} from "../../../../services/data.service";
import {IStorageDate} from "../../../../models/data-models";

@Component({
  selector: 'app-exchange-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class SaleComponent implements OnInit{

  // @ts-ignore
  @Input() domIdExchangeType: number = 0;
  @Input() domIdAccountType: number = 0;
  saleForm: FormGroup;
  isSave: boolean = false;
  display: boolean = false;
  customers: any[] = [];
  goods: any[] = [];
  filterCustomer: any[] = [];
  domGoldAccountType: any[] = [];
  storage: any[] = [];
  transactionId: number;
  mesghalPrice: number;
  gramPrice: number;
  gramWeight: number;
  totalAmount: number = 0;
  count: number = 1;
  rover: number = 750;
  customerID: any;
  goldBoxer: number;
  profit: number = 7;
  pay: number = 5;
  tax: number = 9;
  goldType: any[] = [];
  selectedGoldType: any = enGoldType.buildGold.valueOf();
  isLoading: boolean = false;
  loadingBtnPayment: boolean = false;
  skeletonGoods: boolean = true;
  skeletonGoldType: boolean = true;
  skeletonStorage: boolean = true;
  skeletonDomGoldAccountType: boolean = true;
  skeletonCustomers: boolean = true;
  enGoldType = enGoldType;
  customerId: number = 0;
  enTransferType = enTransferType;
  selectedProfit: boolean = true;
  selectedTax: boolean = true;
  selectedPay: boolean = true;
  rTax: number = 9;
  rPay: number = 5;
  rProfit: number = 7;
  rTotalAmount: number = 0;
  displayCm: boolean = false;

  subscription: Subscription;
  storageDate: IStorageDate;

  constructor(
    public domainsService: DomainsService,
    public customerService: CustomersService,
    public goodService: GoodsService,
    public storageService: StorageService,
    public transactionService: TransactionService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public variables: VariablesService,
    public auth: AuthService,
    public cookie: CookieService,
  ) {

    this.saleForm = new FormGroup({
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: this.domIdExchangeType, disabled: false}),
      DOM_ID_ACCOUNT_TYPE: new FormControl({value: this.domIdAccountType, disabled: false}),
      MANUAL_TOTAL_AMOUNT: new FormControl({value: false, disabled: false}),
      DOM_ID_GOLD_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      GRAM_PRICE: new FormControl({value: null, disabled: false}),
      GRAM_WEIGHT: new FormControl({value: null, disabled: false}),
      PROFIT: new FormControl({value: null, disabled: false}),
      PAY: new FormControl({value: null, disabled: false}),
      TAX: new FormControl({value: null, disabled: false}),
      GOOD_ID: new FormControl({value: null, disabled: false}),
      TOTAL_AMOUNT: new FormControl({value: null, disabled: false}, Validators.required),
      COUNT: new FormControl({value: null, disabled: false}, Validators.required),
      ROVER: new FormControl({value: null, disabled: false}, Validators.required),
      STORAGE_ID: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_GOLD_ACCOUNT_TYPE: new FormControl({value: null, disabled: false}),
      CUSTOMER_ID: new FormControl({value: null, disabled: false}, Validators.required),
      CUSTOMER_NAME: new FormControl({value: null, disabled: false}),
      GOLD_BOXER: new FormControl({value: null, disabled: false}),
      MESGHAL_PRICE: new FormControl({value: null, disabled: false}),

      R_PROFIT: new FormControl({value: null, disabled: false}, Validators.required),
      R_PAY: new FormControl({value: null, disabled: false}, Validators.required),
      R_TAX: new FormControl({value: null, disabled: false}, Validators.required),
      R_TOTAL_AMOUNT: new FormControl({value: null, disabled: false}),
      USE_ID_CREATOR: new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),
    });

    this.domainsService.getGoldAccountType().subscribe(res => {
      if (res.isSuccess) {
        this.domGoldAccountType = res.data;
        this.skeletonDomGoldAccountType = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonDomGoldAccountType = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع حساب طلا!!!', detail: error.message});
      this.skeletonDomGoldAccountType = false;
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

    this.storageService.getStorageTitle().subscribe(res => {
      if (res.isSuccess) {
        this.storage = res.data;
        this.skeletonStorage = false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonStorage = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام انبار ها!!!', detail: error.message});
      this.skeletonStorage = false;
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

  saveStorageDate() {
    debugger;
    if (this.storageDate.hasOwnProperty('GramPrice')) {
      this.storageDate.MesghalPriceSale = this.mesghalPrice;
      this.storageDate.GramPrice = this.gramPrice;
      this.transactionService.setStorageData(this.storageDate).subscribe(res=>{
        return;
      });
    }
  }

  ngOnInit(): void {

    this.saleForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.saleForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

    //this.variables.currentMesghalPriceSale.subscribe(value => this.mesghalPrice = value);
    //this.variables.currentGramPrice.subscribe(value => this.gramPrice = value);

    this.transactionService.getStorageData().subscribe(res => {
      if (res.isSuccess) {
        this.storageDate = res.data[0];
        this.mesghalPrice = this.storageDate.MesghalPriceSale;
        this.gramPrice = this.storageDate.GramPrice;
      }
    })
  }

  search(event: { query: any; }) {
    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );
  }

  onSaveTransaction() {

    if (this.saleForm.valid && this.customerID) {
      this.isLoading = true;
      this.saleForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
      this.saleForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);
      if (this.totalAmount != this.saleForm.controls['TOTAL_AMOUNT'].value) {
        this.saleForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(true);
      } else {
        this.saleForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(false);
      }

      let date = this.saleForm.getRawValue();
      if (date.CUSTOMER_ID) {
        date.CUSTOMER_ID = date.CUSTOMER_ID.value;
      }

      this.transactionService.addTransaction(date).subscribe(res => {
        if (res.isSuccess) {
          this.saveStorageDate();
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
        this.messageService.add({severity: 'error', summary: 'خطا در سرویس ذخیره فروش!!!', detail: error.message});
        this.isLoading = false;
      });
    }
  }

  resetFrom() {
    this.isLoading = false;
    this.isSave = false;
    this.selectedGoldType = enGoldType.buildGold.valueOf();
    this.saleForm.reset({
      DOM_ID_EXCHANGE_TYPE: this.domIdExchangeType,
      DOM_ID_ACCOUNT_TYPE: this.domIdAccountType,
      MANUAL_TOTAL_AMOUNT: false,
      GRAM_PRICE: this.gramPrice,
      MESGHAL_PRICE: this.mesghalPrice,
      DOM_ID_GOLD_TYPE: this.selectedGoldType,
      WITH_TAX_PAY: 0,
      PROFIT: 7,
      PAY: 5,
      TAX: 9,
      R_PROFIT: 7,
      R_PAY: 5,
      R_TAX: 9,
      COUNT: 1,
      ROVER: 750
    });
  }

  getTotalAmount(
    gramWeight: number,
    mesghalPrice: number,
    gramPrice: number,
    profit: number,
    tax: number,
    pay: number,
    rProfit: number,
    rTax: number,
    rPay: number,
    count: number,
    rover: number,
    goldBoxer: number = 0,
  ) {


    let _price: number = 0;
    let _profit: number = 0;
    let _tax: number = 0;
    let _pay: number = 0;
    let _money: number = 0;

    let _rProfit: number = 0;
    let _rTax: number = 0;
    let _rPay: number = 0;
    let _rPrice: number = 0;
    let _rMoney: number = 0;


    if (this.selectedPay) {
      _pay = (gramPrice * pay || 1) / 100;
    }

    _money = ((gramPrice || 0) + (_pay || 0)) * (gramWeight - goldBoxer) || 0;

    if (this.selectedProfit) {
      _profit = (_money * profit || 1) / 100;
    }


    if (this.selectedTax) {
      _tax = ((_money + _profit) * tax || 1) / 100;
    }

    _price = _money + _profit + _tax;


    this.totalAmount = _price * count || 1;
    this.totalAmount = Math.round(this.totalAmount);
    this.saleForm.controls['TOTAL_AMOUNT'].patchValue(this.totalAmount || 0);


    _rPay = (gramPrice * rPay || 1) / 100;

    _rMoney = ((gramPrice || 0) + (_rPay || 0)) * (gramWeight - goldBoxer) || 0;

    _rProfit = (_rMoney * rProfit || 1) / 100;

    _rTax = ((_rMoney + _rProfit) * rTax || 1) / 100;

    _rPrice = _rMoney + _rProfit + _rTax;

    this.rTotalAmount = _rPrice * count || 1;
    this.rTotalAmount = Math.round(this.rTotalAmount);
    this.saleForm.controls['R_TOTAL_AMOUNT'].patchValue(this.rTotalAmount || 0);

  }

  onchange($event: any) {
    this.saleForm.controls['GOOD_ID'].reset();
    this.saleForm.controls['DOM_ID_GOLD_ACCOUNT_TYPE'].reset();
  }

  onChangeProfit(event: any) {
    if (this.selectedProfit == false) {
      this.profit = 0;
      this.saleForm.controls['PROFIT'].reset();
    } else {
      this.profit = 7;
    }
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onChangeTax(event: any) {
    if (this.selectedTax == false) {
      this.tax = 0;
      this.saleForm.controls['TAX'].reset();
    } else {
      this.tax = 9;
    }
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onChangePay(event: any) {
    if (this.selectedPay == false) {
      this.pay = 0;
      this.saleForm.controls['PAY'].reset();
    } else {
      this.pay = 5;
    }
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  showPayment() {
    if (this.customerId > 0) {
      this.loadingBtnPayment = true;
      this.transactionService.getCountSettleByCustomerId(this.customerId).subscribe(res => {
        if (res.isSuccess) {
          if (res.data[0].CNT > 1) {
            this.messageService.add(
              {
                severity: 'info',
                summary: 'به دلیل باز بودن فاکتور قبلی ،امکان پرداخت برای این فاکتور نمی باشد.'
              });
            this.loadingBtnPayment = false;
          } else {
            this.display = true;
            this.loadingBtnPayment = false;
          }
        } else {
          this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          this.loadingBtnPayment = false;
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'خطا در سرویس نمایش تراکنش ها!!!', detail: error.message});
        this.loadingBtnPayment = false;
      })
    } else {
      this.messageService.add({severity: 'warn', summary: 'مشتری انتخاب نشده است !!!'});
    }
  }

  onInputMesghalPrice(event: any) {

    this.variables.changeMesghalPriceSale(event.value);
    this.mesghalPrice = event.value;
    this.getTotalAmount(
      this.gramWeight,
      event.value,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputGramPrice(event: any) {

    this.variables.changeGramPrice(event.value);
    this.gramPrice = event.value;

    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      event.value,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputGramWeight(event: any) {
    this.getTotalAmount(
      event.value,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputCount(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      event.value,
      this.rover,
      this.goldBoxer
    );
  }

  onInputRover(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      event.value,
      this.goldBoxer
    );
  }

  onInputProfit(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      event.value,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputPay(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      event.value,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputTax(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      event.value,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputGoldBoxer(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      event.value,
    );
  }

  onInputRProfit(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      event.value,
      this.rTax,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputRPay(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      this.rTax,
      event.value,
      this.count,
      this.rover,
      this.goldBoxer
    );
  }

  onInputRTax(event: any) {
    this.getTotalAmount(
      this.gramWeight,
      this.mesghalPrice,
      this.gramPrice,
      this.profit,
      this.tax,
      this.pay,
      this.rProfit,
      event.value,
      this.rPay,
      this.count,
      this.rover,
      this.goldBoxer
    );
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
