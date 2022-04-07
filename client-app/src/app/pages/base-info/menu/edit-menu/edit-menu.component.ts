import {Component, OnInit} from '@angular/core';
import { IMenu} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DomainsService} from "../../../../services/domains.service";
import {ICONS} from "../../../../domains/daomins";
import {MenuService} from "../../../../services/menu.service";


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class EditMenuComponent implements OnInit {

  menu: IMenu = {};
  isNew: boolean = true;
  menuForm: FormGroup;
  dimIdCashType: any[] = [];
  icons = ICONS;
  menus: any[] = [];

  constructor(
    public domainService: DomainsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public menuService: MenuService,
    private fb: FormBuilder
  ) {
    this.isNew = true;
    this.menuForm = this.fb.group(
      {
        TITLE: [this.menu.TITLE, Validators.required],
        NAME: [this.menu.NAME, Validators.required],
        ROUTE: [this.menu.ROUTE, Validators.required],
        ICON: [this.menu.ICON, Validators.required],
        MENU_ID: [this.menu.MENU_ID],
        ORDERING: [this.menu.ORDERING, Validators.required],
      }
    );
    this.domainService.getCashType().subscribe(res => {
      if (res.isSuccess) {
        this.dimIdCashType = res.data;
      }
    })

    this.menuService.getAllMenuTitle().subscribe(res=>{
      if (res.isSuccess) {
        this.menus = res.data;
      }
    })
  }


  ngOnInit(): void {

    if (this.config.data.menu) {
      this.menu = JSON.parse(JSON.stringify(this.config.data.menu));
      this.isNew = false;
    }
  }

  saveMenu() {
    if (this.menuForm.valid) {
        this.ref.close(this.menu);
    }
  }

}
