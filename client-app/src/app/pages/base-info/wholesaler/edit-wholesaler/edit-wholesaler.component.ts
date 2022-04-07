import {Component, OnInit} from '@angular/core';
import {IWholesaler} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

@Component({
  selector: 'app-edit-wholesaler',
  templateUrl: './edit-wholesaler.component.html',
  styleUrls: ['./edit-wholesaler.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditWholesalerComponent implements OnInit {

  wholesaler: IWholesaler = {};
  isNew: boolean = true;
  wholesalerForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;

    this.wholesalerForm = this.fb.group(
      {
        TITLE: [this.wholesaler.TITLE, Validators.required],
        RESPONSIBLE_NAME: [this.wholesaler.RESPONSIBLE_NAME, Validators.required],
        ADDRESS: [this.wholesaler.ADDRESS, Validators.required],
        PHONE_ONE: [this.wholesaler.PHONE_ONE, Validators.required],
        PHONE_TOW: [this.wholesaler.PHONE_TOW],
      }
    );
  }


  ngOnInit(): void {

    if (this.config.data.wholesaler) {
      this.wholesaler = JSON.parse(JSON.stringify(this.config.data.wholesaler));
      this.isNew = false;
    }
  }

  saveWholesaler() {
    if (this.wholesalerForm.valid) {
        this.ref.close(this.wholesaler);
      }
  }

}
