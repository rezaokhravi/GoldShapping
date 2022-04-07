import { Component, OnInit } from '@angular/core';
import {SelectItem} from "primeng/api";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import { enAccountType } from 'src/app/domains/daomins';
import {DomainsService} from "../../services/domains.service";

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ExchangesComponent implements OnInit {

  accountTypes: SelectItem[] = [];
  enAccountType=enAccountType;
  selectedAccountType:number=enAccountType.exchange;
  skeletonAccountTypes:boolean=true;

  constructor(public domainsService: DomainsService) {
    this.domainsService.getAccountType().subscribe(res=>{
      if (res.isSuccess){
        this.accountTypes=res.data;
        this.skeletonAccountTypes=false;
      }else{
        this.skeletonAccountTypes=false;
      }
    })
  }

  ngOnInit(): void {

  }
}
