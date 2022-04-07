import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from "sweetalert2";
import {DialogService} from "primeng/dynamicdialog";
import {DomainsService} from "../../../services/domains.service";
import {CustomersService} from "../../../services/customers.service";
import {GoodsService} from "../../../services/goods.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {TransactionService} from "../../../services/transaction.service";
import {enExchangeType, enGoldType} from "../../../domains/daomins";
import {CookieService} from "ngx-cookie-service";
import {VariablesService} from "../../../services/variables.service";
import {AuthService} from "../../../services/auth.service";
import {IStorageDate} from "../../../models/data-models";

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler.component.html',
  styleUrls: ['./wholesaler.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class WholesalerComponent implements OnInit {

  @Input() domIdAccountType: number | undefined;

  wholesalerForm: FormGroup;
  isSave: boolean = false;
  display: boolean = false;
  goods: any[] = [];
  storage:  any[] = [];
  transactionId: number=0;
  enExchangeTypes=enExchangeType;
  domExchangeTypes: number=enExchangeType.purchase;
  goldType: any[] = [];
  selectedGoldType:any=String(enGoldType.waterGold);
  isLoading: boolean=false;
  enGoldType=enGoldType;
  skeletonGoldAccountType: boolean=false;
  domGoldAccountType: any[] = [];
  skeletonGoldType: boolean=true;
  skeletonGoods:  boolean=true;
  skeletonStorage:  boolean=true;
  gramWeight: number;
  count:number=1;
  waterUnder: number
  rover:number=750;
  gramPrice: number;
  mesghalPrice: number;
  totalAmount:number=0;
  mesghalWeight: number;
   storageDate: IStorageDate;

  constructor(
    public messageService: MessageService,
    public dialogService: DialogService,
    public domainsService: DomainsService,
    public customerService: CustomersService,
    public goodService: GoodsService,
    public storageService: StorageService,
    public transactionService: TransactionService,
    public variables: VariablesService,
    public auth:AuthService
  ) {

    this.wholesalerForm = new FormGroup({

      GOOD_ID: new FormControl({value: null, disabled: false}),
      STORAGE_ID:new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_ACCOUNT_TYPE:new FormControl({value: this.domIdAccountType, disabled: false}),
      DOM_ID_GOLD_ACCOUNT_TYPE: new FormControl({value: null, disabled: false}),
      DOM_ID_GOLD_TYPE: new FormControl({value: null, disabled: false}),
      ROVER_WEIGHT_18:new FormControl({value: null, disabled: false}),
      COUNT: new FormControl({value: null, disabled: false}, Validators.required),
      ROVER: new FormControl({value: null, disabled: false}, Validators.required),
      TOTAL_AMOUNT: new FormControl({value: null, disabled: false}),
      WATER_UNDER: new FormControl({value: null, disabled: false}),
      GRAM_WEIGHT: new FormControl({value: null, disabled: false}, Validators.required),
      GRAM_PRICE: new FormControl({value: null, disabled: false}, Validators.required),
      MESGHAL_PRICE: new FormControl({value: null, disabled: false}, Validators.required),
      MESGHAL_WEIGHT: new FormControl({value: null, disabled: false}, Validators.required),
      DOM_ID_EXCHANGE_TYPE: new FormControl({value: null, disabled: false}, Validators.required),
      MANUAL_TOTAL_AMOUNT: new FormControl({value: false, disabled: false}),
      USE_ID_CREATOR:new FormControl({value: this.auth.currentUser.getValue()?.ID, disabled: false}),
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


  }

  ngOnInit(): void {
    this.wholesalerForm.controls['DOM_ID_ACCOUNT_TYPE'].patchValue(this.domIdAccountType);

    this.variables.currentGramPrice.subscribe(value => this.gramPrice=value);
    if  (this.domExchangeTypes == this.enExchangeTypes.purchase){
      this.variables.currentMesghalPricePurchase.subscribe(value => this.mesghalPrice=value);
    }else{
      this.variables.currentMesghalPriceSale.subscribe(value => this.mesghalPrice=value);
    }

    this.transactionService.getStorageData().subscribe(res=>{
      if (res.isSuccess){
        this.storageDate = res.data[0];
        if  (this.domExchangeTypes == this.enExchangeTypes.purchase){
          this.mesghalPrice=this.storageDate.MesghalPricePurchase;
        }else{
          this.mesghalPrice=this.storageDate.MesghalPriceSale;
        }
        this.gramPrice=this.storageDate.GramPrice
      }
    });

  }

  saveStorageDate() {
    if (this.storageDate) {

      if  (this.domExchangeTypes == this.enExchangeTypes.purchase){
       this.storageDate.MesghalPricePurchase= this.mesghalPrice;
      }else{
        this.storageDate.MesghalPriceSale=this.mesghalPrice;
      }
      this.storageDate.GramPrice = this.gramPrice;
      this.transactionService.setStorageData(this.storageDate).subscribe(res=>{
        return;
      });
    }
  }

  onSaveTransaction() {
    this.isLoading=true;

    if (this.totalAmount != this.wholesalerForm.controls['TOTAL_AMOUNT'].value){
      this.wholesalerForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(true);
    }else{
      this.wholesalerForm.controls['MANUAL_TOTAL_AMOUNT'].patchValue(false);
    }

    this.transactionService.addTransaction(this.wholesalerForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.saveStorageDate();
        this.transactionId=res.data[0].ID;
        this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
        this.isLoading=false;
        this.isSave=true;
      } else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
        this.isLoading=false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس ذخبره خرید!!!', detail: error.message});
      this.isLoading=false;
    });



  }

  resetFrom() {
    this.isSave=false;
    this.isLoading=false;
    this.wholesalerForm.reset({
      DOM_ID_ACCOUNT_TYPE:this.domIdAccountType,
      DOM_ID_EXCHANGE_TYPE:this.domExchangeTypes,
      COUNT:1,
      ROVER:750,
      MANUAL_TOTAL_AMOUNT:false,
      GRAM_PRICE:this.gramPrice,
      MESGHAL_PRICE:this.mesghalPrice
    });
  }

  onSave() {

  }

  getTotalAmount(
    mesghalPrice:number = 0,
    gramPrice:number = 0,
    gramWeight:number= 0,
    count:number= 0,
    rover:number= 0,
    waterUnder:number=0
  ) {

    let _price = 0;
    let _money = ((((gramWeight - waterUnder) *750)/rover)/ 4.3318) * mesghalPrice;
    _price = _money * count;
    this.totalAmount =Math.round(_price||0);

    this.wholesalerForm.controls['TOTAL_AMOUNT'].patchValue(this.totalAmount||0);

  }

  SetGram(event: any) {
    this.gramWeight = event.value * 4.3318;
    this. getTotalAmount(
      this.mesghalPrice,
      this.gramPrice,
      this.gramWeight,
      this.count,
      this.rover,
      this.waterUnder
    )
  }

  setMesghal(event: any) {
    this.mesghalWeight = event.value / 4.3318;
    this. getTotalAmount(
     this.mesghalPrice,
      this.gramPrice,
      event.value,
      this.count,
      this.rover,
      this.waterUnder
    )
  }

  onInputMesghalPrice(event: any) {


    if  (this.domExchangeTypes == this.enExchangeTypes.purchase){
      this.variables.changeMesghalPricePurchase(event.value);
    }
    else{
      this.variables.changeMesghalPriceSale(event.value);
    }

    this. getTotalAmount(
      event.value,
      this.gramPrice,
      this.gramWeight,
      this.count,
      this.rover,
      this.waterUnder
    )

  }

  onInputGramPrice(event: any) {

    this.variables.changeGramPrice(event.value);

    this. getTotalAmount(
      this.mesghalPrice,
      event.value,
      this.gramWeight,
      this.count,
      this.rover,
      this.waterUnder
    )
  }

  onInputCount(event: any) {
    this. getTotalAmount(
      this.mesghalPrice,
      this.gramPrice,
      this.gramWeight,
      event.value,
      this.rover,
      this.waterUnder
    )
  }

  onInputWaterUnder(event: any) {
    this. getTotalAmount(
      this.mesghalPrice,
      this.gramPrice,
      this.gramWeight,
      this.count,
      this.rover,
      event.value,
    )
  }

  onInputRover(event: any) {
    this. getTotalAmount(
      this.mesghalPrice,
      this.gramPrice,
      this.gramWeight,
      this.count,
      event.value,
      this.waterUnder
    )
  }

  setSeetionItems() {
    if  (this.domExchangeTypes == this.enExchangeTypes.purchase){
      this.variables.currentMesghalPricePurchase.subscribe(value => this.mesghalPrice=value);
    }else{
      this.variables.currentMesghalPriceSale.subscribe(value => this.mesghalPrice=value);
    }
  }
}
