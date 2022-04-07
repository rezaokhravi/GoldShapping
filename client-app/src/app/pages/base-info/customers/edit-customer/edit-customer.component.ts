import {Component, OnInit} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {ICustomer} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditCustomerComponent implements OnInit {

  customer: ICustomer = {};
  isNew: boolean = true;
  customerForm: FormGroup;
  domIdGenderType: any[] = [];

  constructor(
    public domainsService: DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;
    this.customerForm = this.fb.group(
      {
        DOM_ID_GENDER: [this.customer.DOM_ID_GENDER],
        NAME: [this.customer.NAME, Validators.required],
        FAMILY: [this.customer.FAMILY],
        NATIONAL_CODE: [this.customer.NATIONAL_CODE],
        PHONE: [this.customer.PHONE],
        MOBILE: [this.customer.MOBILE, Validators.required],
        ADDRESS: [this.customer.ADDRESS],
        JOB_TITLE: [this.customer.JOB_TITLE],
        CODE: [this.customer.CODE],
      }
    );

    this.domainsService.getGender().subscribe(res => {
      if (res.isSuccess) {
        this.domIdGenderType = res.data;
      }
    });
  }


  ngOnInit(): void {

    if (this.config.data.customer) {
      this.customer = JSON.parse(JSON.stringify(this.config.data.customer));
      this.isNew = false;
    }
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.ref.close(this.customer);
    }
  }

}
