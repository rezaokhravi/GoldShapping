import {Component, Input, OnInit} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import { enExchangeType } from 'src/app/domains/daomins';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})

export class ExchangeComponent implements OnInit {

  @Input() domIdAccountType: number =0;

  domIdExchangeType: number=enExchangeType.purchase;
  enExchangeTypes=enExchangeType;


  constructor(
  ) {
  }

  ngOnInit(): void {

  }



}
