import {Component, OnInit} from '@angular/core';
import {IDomains, IMenu} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DomainsService} from "../../../../services/domains.service";
import {ICONS} from "../../../../domains/daomins";
import {MenuService} from "../../../../services/menu.service";


@Component({
  selector: 'app-edit-domain',
  templateUrl: './edit-domain.component.html',
  styleUrls: ['./edit-domain.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditDomainComponent implements OnInit {

  domain: IDomains = {};
  isNew: boolean = true;
  editDomainForm: FormGroup;
  dimIdCashType: any[] = [];
  icons = ICONS;
  domainTitle: any[] = [];

  constructor(
    public domainService: DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;
    this.editDomainForm = this.fb.group(
      {
        DOM_ID: [this.domain.DOM_ID],
        CODE: [this.domain.CODE, Validators.required],
        TITLE: [this.domain.TITLE, Validators.required],
        NAME: [this.domain.NAME, Validators.required],
        DESCRIPTION: [this.domain.DESCRIPTION],
        IS_ACTIVE: [this.domain.IS_ACTIVE],
        ORDERING: [this.domain.ORDERING],
      }
    );
    this.domainService.getDomainTitle().subscribe(res => {
      if (res.isSuccess) {
        this.domainTitle = res.data;
      }
    })
  }


  ngOnInit(): void {

    this.editDomainForm.controls['DOM_ID'].patchValue(this.config.data.domId);
    this.domain.IS_ACTIVE=true;
    if (this.config.data.domain) {
      this.domain = JSON.parse(JSON.stringify(this.config.data.domain));
      this.isNew = false;
    }

  }

  saveMenu() {
    if (this.editDomainForm.valid) {
        this.ref.close(this.domain);
    }
  }

  changeCode(event: any) {
    this.domain.CODE=event;
    this.domain.ORDERING=event;
  }
}
