import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  public toggleMenu:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isMobile:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public displayFloatLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private MesghalPriceSale:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private MesghalPricePurchase:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private GramPrice:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public currentMesghalPriceSale=this.MesghalPriceSale.asObservable();
  public currentMesghalPricePurchase=this.MesghalPricePurchase.asObservable();
  public currentGramPrice=this.GramPrice.asObservable();

  constructor() { }

  getScreenSize(event?:any) {
    //this.scrHeight = window.innerHeight;
    this.isMobile.next(window.innerWidth<=740?true:false);
    if (this.isMobile.getValue()){
      this.toggleMenu.next(false);
    }else{
      this.toggleMenu.next(true);
    }
  }

  changeMesghalPriceSale(value){
  this.MesghalPriceSale.next(value);
  }
  changeMesghalPricePurchase(value){
    this.MesghalPricePurchase.next(value);
  }
  changeGramPrice(value){
    this.GramPrice.next(value);
  }
}
