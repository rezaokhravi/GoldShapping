import {Component, OnInit} from '@angular/core';
import {ICash} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DomainsService} from "../../../../services/domains.service";

@Component({
  selector: 'app-edit-cash',
  templateUrl: './edit-cash.component.html',
  styleUrls: ['./edit-cash.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditCashComponent implements OnInit {

  cash: ICash = {};
  isNew: boolean = true;
  cashForm: FormGroup;
  dimIdCashType: any[] = [];

  constructor(
    public domainService: DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;
    this.cashForm = this.fb.group(
      {
        TITLE: [this.cash.TITLE, Validators.required],
        DOM_ID_TYPE: [this.cash.DOM_ID_TYPE, Validators.required],
        ACCOUNT_NUMBER: [this.cash.ACCOUNT_NUMBER],
        CARD_NUMBER: [this.cash.CARD_NUMBER],
        CASH_CREATURE: [this.cash.CASH_CREATURE, Validators.required],
      }
    );
    this.domainService.getCashType().subscribe(res => {
      if (res.isSuccess) {
        this.dimIdCashType = res.data;
      }
    })
  }


  ngOnInit(): void {

    if (this.config.data.cash) {
      this.cash = JSON.parse(JSON.stringify(this.config.data.cash));
      this.isNew = false;
    }
  }

  saveCash() {
    if (this.cashForm.valid) {
        this.ref.close(this.cash);
    }
  }

}
