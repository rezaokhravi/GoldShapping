import {Component, OnInit} from '@angular/core';
import {IExitedTransaction} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {GoodsService} from "../../../../services/goods.service";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-edit-exited-transaction',
  templateUrl: './edit-exited-transaction.component.html',
  styleUrls: ['./edit-exited-transaction.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditExitedTransactionComponent implements OnInit {

  exitedTransaction: IExitedTransaction = {};
  isNew: boolean = true;
  exitedTransactionForm: FormGroup;
  goods: any[]=[];
  storage: any[]=[];

  constructor(
    public goodService:GoodsService,
    public storageService:StorageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;

    this.exitedTransactionForm = this.fb.group(
      {
        GOOD_ID: [this.exitedTransaction.GOOD_ID, Validators.required],
        STORAGE_ID: [this.exitedTransaction.STORAGE_ID, Validators.required],
        WEIGHT: [this.exitedTransaction.WEIGHT, Validators.required],
        COUNT: [this.exitedTransaction.COUNT, Validators.required],
      }
    );

    this.goodService.getGoodTitle().subscribe(res=>{
      if (res.isSuccess){
        this.goods = res.data;
      }else {
      }
    },error => {
    });

    this.storageService.getStorageTitle().subscribe(res=>{
      if (res.isSuccess){
        this.storage = res.data;
      }else {
      }
    },error => {
    });

  }


  ngOnInit(): void {
    if (this.config.data.exitedTransaction) {
      this.exitedTransaction = JSON.parse(JSON.stringify(this.config.data.exitedTransaction));
      this.isNew = false;
    }
  }

  save() {
    if (this.exitedTransactionForm.valid) {
      this.ref.close(this.exitedTransaction);
    }
  }

}
