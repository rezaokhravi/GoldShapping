import {Component, OnInit} from '@angular/core';
import {IGood} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DomainsService} from "../../../../services/domains.service";

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditGoodComponent implements OnInit {

  good: IGood = {};
  isNew: boolean = true;
  goodForm: FormGroup;
  domGoodType: any[]=[];

  constructor(
    public domainsService:DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.isNew = true;

    this.goodForm = this.fb.group(
      {
        TITLE: [this.good.TITLE, Validators.required],
        DOM_ID_TYPE: [this.good.DOM_ID_TYPE],
        CODE: [this.good.CODE, Validators.required],
      }
    );

    this.domainsService.getGoodType().subscribe(res=>{
      if (res.isSuccess){
        this.domGoodType = res.data;
      }else {
      }
    },error => {
    });
  }


  ngOnInit(): void {


    console.log("config:::", this.config);
    if (this.config.data.good) {
      this.good = JSON.parse(JSON.stringify(this.config.data.good));
      this.isNew = false;
    }
  }

  saveGood() {
    if (this.goodForm.valid) {
      this.ref.close(this.good);
    }
  }

}
