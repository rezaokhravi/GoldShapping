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
import {DataService} from "../../../../services/data.service";
import {IStorageDate} from "../../../../models/data-models";

@Component({
  selector: 'app-exchange-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class PurchaseComponent implements OnInit {

  // @ts-ignore
  @Input() domIdExchangeType: number = 0;
  @Input() domIdAccountType: number = 0;

  transaction: any = {};

  purchaseForm: FormGroup;
  isSave: boolean = false;
  display: boolean = false;
  customers: any[] = [];
  goods: any[] = [];
  filterCustomer: any[] = [];
  domGoldAccountType: any[] = [];
  storage: any[] = [];
  transactionId: number;
  customerId: number;
  totalAmount: number = 0;
  gramPrice: number;
  gramWeight: number;
  count: number = 1;
  rover: number = 750;
  goldBoxer: number;
  customerID: any;
  mesghalPrice: number;
  goldType: any[] = [];
  selectedGoldType: any = enGoldType.buildGold.valueOf();
  enTransferType = enTransferType;
  enGoldType = enGoldType;
  isLoading: boolean = false;
  skeletonGoods: boolean = true;
  skeletonGoldType: boolean = true;
  skeletonGoldAccountType: boolean = true;
  skeletonStorage: boolean = true;
  skeletonCustomers: boolean = true;
  skeletonDomGoldAccountType: boolean = true;
  loadingBtnPayment: boolean = false;
  displayCm: boolean = false;
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
    public auth:AuthService,
    public cookie: CookieService,
  ) {

    this.purchaseForm = new FormGroup({
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: this.domIdExchangeType, disabled: false}),
      DOM_ID_ACCOUNT_TYPE: new FormControl({value: this.domIdAccountType, disabled: false}),
      DOM_ID_GOLD_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      MANUAL_TOTAL_AMOUNT: new FormControl({value: false, disabled: false}),
      GRAM_PRICE: new FormControl({value: null, disabled: false}),
      GRAM_WEIGHT: new FormControl({value: null, disabled: false}),
      MESGHAL_PRICE: new FormControl({value: null, disabled: false}),
      GOOD_ID: new FormControl({value: null, disabled: false}),
      TOTAL_AMOUNT: new FormControl({value: null, disabled: false}, Validators.required),
      COUNT: new FormControl({value: null, disabled: false}, Validators.required),
      ROVER: new FormControl({value: null, disabled: false}, Validators.required),
      STORAGE_ID: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_GOLD_ACCOUNT_TYPE: new FormControl({value: null, disabled: false}),
      CUSTOMER_ID: new FormControl({value: null, disabled: false}, Validators.required),
      GOLD_BOXER: new FormControl({value: null, disabled: false}),
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

    this.customerService.getFullTitle().subscribe(res => {
      if (res.isSuccess) {
        this.skeletonCustomers=false;
        this.customers = res.data;
      } else {
        this.skeletonCustomers=false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.skeletonCustomers=false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
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
    if (this.storageDate) {
      this.storageDate.MesghalPricePurchase = this.mesghalPrice;
      this.storageDate.GramPrice = this.gramPrice;
      this.transactionService.setStorageData(this.storageDate).subscribe(res=>{
        return;
      });
    }
  }

  async ngOnInit() {
    this.purchaseForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.purchaseForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

    this.variables.currentMesghalPricePurchase.subscribe(value => this.mesghalPrice=value);
    this.variables.currentGramPrice.subscribe(value => this.gramPrice=value);

    this.transactionService.getStorageData().subscribe(res=>{
      if (res.isSuccess){
        this.storageDate = res.data[0];
        this.mesghalPrice=this.storageDate.MesghalPricePurchase;
        this.gramPrice=this.storageDate.GramPrice
      }
    })

  }

  search(event: { query: any; }) {
    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );
  }

  getTotalAmount() {
    if (isNaN(this.mesghalPrice) ){
      this.mesghalPrice = 0
    }
    if (isNaN(this.gramPrice) ){
      this.gramPrice = 0
    }

    let price = 0;
    let money = (((this.gramWeight * 750)/this.rover) / 4.3318) * this.mesghalPrice;
    price = money * this.count;
    this.totalAmount = price || 0;
    this.totalAmount = Math.round(this.totalAmount);
    this.purchaseForm.controls['TOTAL_AMOUNT'].patchValue(this.totalAmount || 0);
  }

  onSaveTransaction() {
    if (this.purchaseForm.valid && this.customerID) {
      this.isLoading = true;
      this.purchaseForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
      this.purchaseForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

      if (this.totalAmount != this.purchaseForm.controls['TOTAL_AMOUNT'].value) {
        this.purchaseForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(true);
      } else {
        this.purchaseForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(false);
      }

      this.transaction = this.purchaseForm.getRawValue();
      if (this.transaction.CUSTOMER_ID) {
        this.transaction.CUSTOMER_ID = this.transaction.CUSTOMER_ID.value;

      }


      this.transactionService.addTransaction(this.transaction).subscribe(res => {
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
        this.messageService.add({severity: 'error', summary: 'خطا در سرویس ذخبره خرید!!!', detail: error.message});
        this.isLoading = false;
      });
    }
  }

  resetFrom() {
    this.isSave = false;
    this.isLoading = false;
    this.transactionId = 0;
    this.selectedGoldType = enGoldType.buildGold.valueOf();
    this.purchaseForm.reset({
      DOM_ID_EXCHANGE_TYPE: this.domIdExchangeType,
      DOM_ID_ACCOUNT_TYPE: this.domIdAccountType,
      MANUAL_TOTAL_AMOUNT: false,
      GRAM_PRICE: this.gramPrice,
      MESGHAL_PRICE: this.mesghalPrice,
      DOM_ID_GOLD_TYPE: this.selectedGoldType,
      COUNT: 1,
      ROVER: 750
    });

  }

  onchange($event: any) {
    this.purchaseForm.controls['GOOD_ID'].reset();
    this.purchaseForm.controls['DOM_ID_GOLD_ACCOUNT_TYPE'].reset();
  }

  showPayment() {
    if (this.customerId>0){
      this.loadingBtnPayment=true;
      this.transactionService.getCountSettleByCustomerId(this.customerId).subscribe(res=>{
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

  onChangeGramPrice(event: any) {
    this.variables.changeGramPrice(event.value);
    this.gramPrice = event.value;
    this.getTotalAmount();
  }

  onChangeMesghalPrice(event: any) {
    this.variables.changeMesghalPricePurchase(event.value);
    this.mesghalPrice = event.value;
    this.getTotalAmount();
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
