import {Component, OnInit} from '@angular/core';
import {IWorkshop} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditWorkshopComponent implements OnInit {

  workshop: IWorkshop = {};
  workshops: IWorkshop[] = [];
  isNew: boolean = true;
  workshopForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;

    this.workshopForm = this.fb.group(
      {
        TITLE: [this.workshop.TITLE, Validators.required],
        RESPONSIBLE_NAME: [this.workshop.RESPONSIBLE_NAME, Validators.required],
        ADDRESS: [this.workshop.ADDRESS, Validators.required],
        PHONE_ONE: [this.workshop.PHONE_ONE, Validators.required],
        PHONE_TOW: [this.workshop.PHONE_TOW],
      }
    );
  }


  ngOnInit(): void {

    if (this.config.data.workshop) {
      this.workshop = JSON.parse(JSON.stringify(this.config.data.workshop));
      this.isNew = false;
    }

  }

  saveWorkshop() {
    if (this.workshopForm.valid) {
        this.ref.close(this.workshop);
    }
  }


}
