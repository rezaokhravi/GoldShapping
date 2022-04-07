import {Component, OnInit} from '@angular/core';
import {IStorage} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DomainsService} from "../../../../services/domains.service";

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditStorageComponent implements OnInit {

  storeroom: IStorage = {};
  isNew: boolean = true;
  storageForm: FormGroup;
  domStorageType: any[] = [];

  constructor(
    public domainService: DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;

    this.storageForm = this.fb.group(
      {
        TITLE: [this.storeroom.TITLE, Validators.required],
        DOM_ID_TYPE: [this.storeroom.DOM_ID_TYPE, Validators.required],
      }
    );

    this.domainService.getStorageType().subscribe(res => {
      if (res.isSuccess) {
        this.domStorageType = res.data;
      }
    })
  }


  ngOnInit(): void {
    console.log("config:::", this.config);
    if (this.config.data.storeroom) {
      this.storeroom = JSON.parse(JSON.stringify(this.config.data.storeroom));
      this.isNew = false;
    }
  }

  saveStorage() {
    if (this.storageForm.valid) {
      this.ref.close(this.storeroom);
    }
  }

}
