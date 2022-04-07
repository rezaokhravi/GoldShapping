import {Component, Input, OnInit} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import Swal from 'sweetalert2'
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../../../services/transaction.service";
import {DialogService} from "primeng/dynamicdialog";
import {enExchangeType} from "../../../../domains/daomins";

@Component({
  selector: 'app-exchange-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class ChangeComponent implements OnInit {

  // @ts-ignore
  @Input() domIdExchangeType:number=0;
  @Input() domIdAccountType:number=0;

  enExchangeTypes=enExchangeType;

  constructor(
    public messageService: MessageService,
    public dialogService: DialogService
  ) {

  }

  ngOnInit(): void {

  }



}
