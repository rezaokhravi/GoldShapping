import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import { DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {IUser} from "../../../../models/data-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fadeInOnEnterAnimation} from "angular-animations";
import {UsersService} from "../../../../services/users.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ],
})
export class EditUserComponent implements OnInit {

  user: IUser = {};
  isNew: boolean = true;
  userForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
  ) {
    this.isNew = true;

    this.userForm = this.fb.group(
      {
        NAME: [this.user.NAME, Validators.required],
        FAMILY: [this.user.FAMILY, Validators.required],
        NATIONAL_CODE: [this.user.NATIONAL_CODE, Validators.required],
        MOBILE: [this.user.MOBILE, Validators.required],
        EMAIL: [this.user.EMAIL, Validators.required],
        USER_NAME: [this.user.USER_NAME, Validators.required],
        PASSWORD: [this.user.PASSWORD, Validators.required],
        ADDRESS: [this.user.ADDRESS, Validators.required]
      }
    );
  }


  ngOnInit(): void {

    if (this.config.data.user) {
      this.user = JSON.parse(JSON.stringify(this.config.data.user));
      this.isNew = false;
    }
  }

  saveUser() {
    if (this.userForm.valid) {
        this.ref.close(this.user);
    }
  }
}
