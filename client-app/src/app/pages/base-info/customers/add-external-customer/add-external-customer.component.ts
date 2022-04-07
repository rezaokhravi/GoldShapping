import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {ICustomer} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DomainsService} from "../../../../services/domains.service";
import {CustomersService} from "../../../../services/customers.service";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-external-customer',
  templateUrl: './add-external-customer.component.html',
  styleUrls: ['./add-external-customer.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    MessageService
  ]
})
export class AddExternalCustomerComponent implements OnInit {

  customer: ICustomer = {};
  isNew: boolean = true;
  customerForm: FormGroup;
  domIdGenderType: any[] = [];
  @Output() closeMe = new EventEmitter(false);

  constructor(
    public customerServices: CustomersService,
    public messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group(
      {
        FAMILY: [this.customer.FAMILY, Validators.required],
        MOBILE: [this.customer.MOBILE, Validators.required],
      }
    );
  }


  ngOnInit(): void {
    this.customerForm.reset();
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.customerServices.addCustomer(this.customerForm.getRawValue()).pipe(
       finalize(()=>{
         setTimeout(()=>{this.closeMe.emit(true);},700);
       })
      ).subscribe(res => {
          if (res.isSuccess) {
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          }
        });
    }
  }

  onCloseMe(event) {
    this.closeMe.emit(false);
  }
}
