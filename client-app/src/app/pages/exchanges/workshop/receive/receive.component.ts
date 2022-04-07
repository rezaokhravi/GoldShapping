import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomer, IStorageDate, ITransaction} from "../../../../models/data-models";
import {TransactionService} from "../../../../services/transaction.service";
import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";
import {CustomersService} from "../../../../services/customers.service";
import {GoodsService} from "../../../../services/goods.service";
import {StorageService} from "../../../../services/storage.service";
import moment from "jalali-moment";
import {DatePickerConfig} from "../../../../domains/daomins";
import {CookieService} from "ngx-cookie-service";
import {VariablesService} from "../../../../services/variables.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-workshop-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class ReceiveComponent implements OnInit {

  // @ts-ignore
  @Input() domIdExchangeType:number=0;
  @Input() domIdAccountType:number=0;

  receiveForm : FormGroup;
  isSave:boolean=false;
  display:boolean=false;
  filterCustomer: any[]=[];
  orders: any[]=[];
  transactionId: number=0;
  goldType: any[] = [];
  selectedGoldType:any;
  isLoading: boolean=false;
  skeletonOrders: boolean=true;
  filterOrder: any[]=[];
  selectedOrder: any;
  transaction: any;
  gramPrice: any;
  datePickerConfig: any=DatePickerConfig;
  settlementDate: any;
  skeletonGoldType: boolean=true;
  selectedSettlementDates: any;
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

    this.receiveForm = new FormGroup({
      ID: new FormControl({value:null, disabled: false}, Validators.required ),
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: this.domIdExchangeType, disabled: false} ),
      DOM_ID_ACCOUNT_TYPE: new FormControl({value: this.domIdAccountType, disabled: false} ),
      DOM_ID_GOLD_TYPE: new FormControl({value: null, disabled: false}),
      GRAM_PRICE: new FormControl({value: null, disabled: false} ),
      DIFFERENT_WEIGHT: new FormControl({value: null, disabled: false} ),
      GOLD_PRICE: new FormControl({value: null, disabled: false} ),
      TOTAL_AMOUNT: new FormControl({value: null, disabled: false} , Validators.required),
      SETTLEMENT_DATE:new FormControl({value: moment().locale('fa').format('jYYYY/jMM/jDD'), disabled: true},Validators.required),
      USE_ID_CREATOR:new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),
    });
    this.selectedSettlementDates = moment().locale('fa');

  }

  ngOnInit(): void {

    this.receiveForm.controls['DOM_ID_EXCHANGE_TYPE'].patchValue(this.domIdExchangeType);
    this.receiveForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

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

    this.transactionService.getOrderTitleWorkShop().subscribe(res => {
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


    this.variables.currentGramPrice.subscribe(value => this.gramPrice=value);

    this.transactionService.getStorageData().subscribe(res=>{
      if (res.isSuccess){
        this.storageDate = res.data[0];
        this.gramPrice=this.storageDate.GramPrice;
      }
    });

  }

  saveStorageDate() {
    if (this.storageDate) {

      this.storageDate.GramPrice = this.gramPrice;
      this.transactionService.setStorageData(this.storageDate).subscribe(res=>{
        return;
      });
    }
  }

  onSaveTransaction() {
    this.isLoading=true;
    this.transactionService.addTransaction(this.receiveForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.saveStorageDate();
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
    this.receiveForm.reset({
      DOM_ID_EXCHANGE_TYPE:this.domIdExchangeType,
      DOM_ID_ACCOUNT_TYPE:this.domIdAccountType,
      GRAM_PRICE:this.gramPrice
    });
  }

  searchOrder(event: { query: any; }) {
    this.filterOrder = this.orders.filter(item =>
      String(item.Full_TITLE).includes(event.query)
    );
  }

  getOrderTransaction(event: any) {
    console.log('event:::',event);
    this.transaction = event;
    this.receiveForm.controls['ID'].patchValue(this.transaction.ID);
    this.receiveForm.controls['GOLD_PRICE'].patchValue(this.transaction.GOLD_PRICE);
    this.receiveForm.controls['DOM_ID_GOLD_TYPE'].patchValue(this.transaction.DOM_ID_GOLD_TYPE);
    this.receiveForm.controls['DIFFERENT_WEIGHT'].patchValue(this.transaction.DIFFERENT_WEIGHT);
    this.receiveForm.controls['TOTAL_AMOUNT'].patchValue(this.transaction.TOTAL_AMOUNT||0);
    console.log('this.transaction::', this.transaction);
debugger;
  }

  onChangeGramPrice(event: any) {

    this.variables.changeGramPrice(event.value);

    this.gramPrice = event.value;
  }

  selectedSettlementDate(event: any) {
    if (event.length > 0) {
      this.receiveForm.controls['SETTLEMENT_DATE'].patchValue(event[0].format('jYYYY/jMM/jDD'));
    } else {
      this.receiveForm.controls['SETTLEMENT_DATE'].patchValue(null);
    }
  }

}
