import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DashboardService} from "../../services/dashboard.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    MessageService
  ]
})
export class DashbordComponent implements OnInit {

  transaction: any;
  goldCreature: any;
  goldCard: any;
  chartOptions: any;
  storageCreature: any;
  cashCreature: any;
  goodCreature: any[]=[];
  transactionToDay: any;
  orders: any;
  transToDay: any;
  skeletonTransToDay: boolean=true;
  skeletonTransaction: boolean=true;
  skeletonGoldCreature: boolean=true;
  skeletonOrders: boolean=true;
  skeletonGoldCard: boolean=true;
  skeletonStorageCreature: boolean=true;
  skeletonCashCreature: boolean=true;
  skeletonGoodCreature: boolean=true;

  constructor(public authService: AuthService,
              public dashboardService:DashboardService,
              public messageService: MessageService,) {

    this.chartOptions = {
      plugins: {
        title: {
          display: true,
          fontSize: 16,
          position: 'bottom',
          color: '#b8b8b8'
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            fontSize: 12,
            color: '#495057'
          }
        }
      }
    }

  }

  ngOnInit(): void {

    this.dashboardService.getFnDashboardTransaction().subscribe(res=>{
      if (res.isSuccess){
        let data = res.data[0]
        this.transaction = {
          labels: ['خرید','فروش'],
          datasets: [
            {
              data: [(data?.purchase||0),(data?.sale||0)],
              backgroundColor: [
                "#61d254",
                "rgba(170,170,170,0.42)"
              ],
              hoverBackgroundColor: [
                "#208d3b",
                "rgba(170,170,170,0.42)"
              ]
            }
          ]
        };
        this.skeletonTransaction=false;
      }
    });

    this.dashboardService.getFnDashboardGoldCreature().subscribe(res=>{
      if (res.isSuccess){
        let data = res.data[0]
        this.goldCreature = {
          labels: ['بدهکاری','موجودی'],
          datasets: [
            {
              data: [(data?.debt||0),(data?.cash||0)],
              backgroundColor: [
                "#9e54d2",
                "rgba(170,170,170,0.42)"
              ],
              hoverBackgroundColor: [
                "#4d208d",
                "rgba(170,170,170,0.42)"
              ]
            }
          ]
        };
        this.skeletonGoldCreature=false;
      }
    });

    this.dashboardService.getFnDashboardStorageCreature().subscribe(res=>{
      if (res.isSuccess){
        this.storageCreature =res.data[0];
        this.skeletonStorageCreature=false;
      }
    });


    this.dashboardService.getFnDashboardCashCreature().subscribe(res=>{
      if (res.isSuccess){
        this.cashCreature =res.data[0];
        this.skeletonCashCreature=false;
      }
    });

    this.dashboardService.getFnDashboardGoodCreature().subscribe(res=>{
      if (res.isSuccess){
        this.goodCreature =res.data;
        this.skeletonGoodCreature=false;
      }
    });

    this.dashboardService.getFnDashboardGoldCard().subscribe(res=>{
      if (res.isSuccess){
        let data = res.data[0]
        this.goldCard = {
          labels: ['حساب ریالی','طلا'],
          datasets: [
            {
              data: [(data?.gold||0),(data?.cash||0)],
              backgroundColor: [
                "#d254b7",
                "rgba(170,170,170,0.42)"
              ],
              hoverBackgroundColor: [
                "#75208d",
                "rgba(170,170,170,0.42)"
              ]
            }
          ]
        };
        this.skeletonGoldCard=false;
      }
    });


    this.dashboardService.getFnDashboardOrders().subscribe(res=>{
      if (res.isSuccess){
        let data = res.data[0]
        this.orders = {
          labels: ['دریافتی','ارسالی'],
          datasets: [
            {
              data: [(data?.pay||0),(data?.sent||0)],
              backgroundColor: [
                "#f56708",
                "rgba(170,170,170,0.42)"
              ],
              hoverBackgroundColor: [
                "#8d5c20",
                "rgba(170,170,170,0.42)"
              ]
            }
          ]
        };
        this.skeletonOrders=false;
      }
    });


    this.dashboardService.getFnDashboardTransactionToDay().subscribe(res=>{
      if (res.isSuccess){
        this.transactionToDay = res.data[0]
        this.transToDay = {
          labels: ['فروش امروز','خرید امروز'],
          datasets: [
            {
              data: [(this.transactionToDay?.sale||0),(this.transactionToDay?.purchase||0)],
              backgroundColor: [
                "#e70ef6",
                "rgba(170,170,170,0.42)"
              ],
              hoverBackgroundColor: [
                "#9e11ad",
                "rgba(170,170,170,0.42)"
              ]
            }
          ]
        };
        this.skeletonTransToDay=false;
      }
    });

  }

}
