import {Component, Input, OnInit} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {enExchangeType} from "../../../domains/daomins";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class WorkshopComponent implements OnInit {

  @Input() domIdAccountType: number =0;
  enExchangeTypes=enExchangeType;
  domIdExchangeType: number=enExchangeType.deliver;


  constructor(
  ) {
  }

  ngOnInit(): void {

  }
}
