import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomer, ITransaction} from "../../../../models/data-models";
import {TransactionService} from "../../../../services/transaction.service";
import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";
import {CustomersService} from "../../../../services/customers.service";
import {GoodsService} from "../../../../services/goods.service";
import {StorageService} from "../../../../services/storage.service";
import {DatePickerConfig, enGoldType} from "../../../../domains/daomins";
import moment from "jalali-moment";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-workshop-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class DeliverComponent implements OnInit {

  // @ts-ignore
  @Input() domIdExchangeType:number=0;
  @Input() domIdAccountType:number=0;
  deliverForm : FormGroup;
  isSave:boolean=false;
  display:boolean=false;
  customers: any[]=[];
  goods: any[]=[];
  filterCustomer: any[]=[];
  storage: any[]=[];
  transactionId: number=0;
  goldType: any[] = [];
  selectedGoldType:any=String(enGoldType.buildGold) ;
  isLoading: boolean=false;
  enGoldType=enGoldType;
  skeletonGoods: boolean=true;
  skeletonGoldAccountType: boolean=true;
  domGoldAccountType:any[] = [];
  skeletonGoldType: boolean=true;
  skeletonStorage: boolean=true;
  datePickerConfig: any=DatePickerConfig;
  orderDate: any;
  skeletonOrders: boolean=true;
  filterOrder: any[]=[];
  orders:any[]=[];
  selectedOrder: any;


  constructor(
    public domainsService: DomainsService,
    public customerService: CustomersService,
    public goodService: GoodsService,
    public storageService: StorageService,
    public transactionService: TransactionService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public auth:AuthService
  ) {

    this.deliverForm = new FormGroup({
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: this.domIdExchangeType, disabled: false} ),
      DOM_ID_ACCOUNT_TYPE: new FormControl({value: this.domIdAccountType, disabled: false} ),
      DOM_ID_GOLD_ACCOUNT_TYPE: new FormControl({value: null, disabled: false}),
      DOM_ID_GOLD_TYPE: new FormControl({value: null, disabled: false}),
      GOLD_WEIGHT: new FormControl({value: null, disabled: false} ),
      STORAGE_ID: new FormControl({value: null, disabled: false} ),
      GOOD_ID: new FormControl({value: null, disabled: false} ),
      ORDER_ID: new FormControl({value: null, disabled: false} ),
      ORDER_CODE: new FormControl({value: null, disabled: false} ),
      ORDER_DATE: new FormControl({value: moment().locale('fa').format('jYYYY/jMM/jDD'), disabled: true}, Validators.required),
      USE_ID_CREATOR:new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),

    });
debugger;

    this.customerService.getFullTitle().subscribe(res=>{
      if (res.isSuccess){
        this.customers = res.data;
      }else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    },error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام مشتری ها!!!', detail: error.message});
    });

    this.goodService.getGoodTitle().subscribe(res=>{
      if (res.isSuccess){
        this.goods = res.data;
        this.skeletonGoods=false;
      }else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoods=false;
      }
    },error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام کالا ها!!!', detail: error.message});
      this.skeletonGoods=false;
    });

    this.storageService.getStorageTitle().subscribe(res=>{
      if (res.isSuccess){
        this.storage = res.data;
        this.skeletonStorage=false;
      }else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonStorage=false;
      }
    },error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نام انبار ها!!!', detail: error.message});
      this.skeletonStorage=false;
    });

    this.domainsService.getGoldType().subscribe(res => {
      if (res.isSuccess) {
        this.goldType = res.data;
        this.skeletonGoldType=false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoldType=false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع طلا!!!', detail: error.message});
      this.skeletonGoldType=false;
    });

    this.domainsService.getGoldAccountType().subscribe(res => {
      if (res.isSuccess) {
        this.domGoldAccountType = res.data;
        this.skeletonGoldAccountType=false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.skeletonGoldAccountType=false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس نوع حساب طلا!!!', detail: error.message});
      this.skeletonGoldAccountType=false;
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

  }

  ngOnInit(): void {
    this.deliverForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.deliverForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);
  }


  search(event: { query: any; }) {
    this.filterCustomer = this.customers.filter(item =>
      String(item.label).includes(event.query)
    );
  }

  onSaveTransaction() {
    this.isLoading=true;
    this.transactionService.addTransaction(this.deliverForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.transactionId=res.data[0].ID;
        this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
        this.isSave=true;
        this.isLoading=false;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.isLoading=false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس ذخیره فروش!!!', detail: error.message});
      this.isLoading=false;
    });
  }

  resetFrom() {
    this.isSave=false;
    this.isLoading=false;
    this.deliverForm.reset(
      {
        DOM_ID_EXCHANGE_TYPE:this.domIdExchangeType,
        DOM_ID_ACCOUNT_TYPE:this.domIdAccountType
      });
  }

  selectedOrderDate(event: any) {
    if (event.length > 0) {
      this.orderDate = event[0].format('jYYYY/jMM/jDD');
    } else {
      this.orderDate = null;
    }
  }

  searchOrder(event: { query: any; }) {
    this.filterOrder = this.orders.filter(item =>
      String(item.Full_TITLE).includes(event.query)
    );
  }

  getOrderTransaction(event: any) {
    if (event && event.ID){
      this.deliverForm.controls['ORDER_ID'].patchValue(event.ID);
    }else{
      this.deliverForm.controls['ORDER_ID'].patchValue(null);
    }

  }
}
