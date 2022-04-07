import {Component, HostListener, OnInit} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation} from "angular-animations";
import {VariablesService} from "./services/variables.service";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})

export class AppComponent implements OnInit  {
  title = 'client-app';
  constructor(public variable:VariablesService,
              public primengConfig: PrimeNGConfig
              ) {
    this.variable.getScreenSize();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
      "startsWith": "Starts with",
      "contains": "Contains",
      "notContains": "Not contains",
      "endsWith": "Ends with",
      "equals": "Equals",
      "notEquals": "Not equals",
      "noFilter": "No Filter",
      "lt": "Less than",
      "lte": "Less than or equal to",
      "gt": "Greater than",
      "gte": "Great then or equals",
      "is": "Is",
      "isNot": "Is not",
      "before": "Before",
      "after": "After",
      "clear": "Clear",
      "apply": "Apply",
      "matchAll": "Match All",
      "matchAny": "Match Any",
      "addRule": "Add Rule",
      "removeRule": "Remove Rule",
      "accept": "Yes",
      "reject": "No",
      "choose": "Choose",
      "upload": "Upload",
      "cancel": "Cancel",
      "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      "dayNamesMin": ["Su","Mo","Tu","We","Th","Fr","Sa"],
      "monthNames": ["January","February","March","April","May","June","July","August","September","October","November","December"],
      "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "today": "Today",
      "weekHeader": "Wk",
      "weak": 'ضعیف',
      "medium": 'متوسط',
      "strong": 'قوی',
      "passwordPrompt": 'ورود کلمه عبور ...',
      "emptyMessage": 'گزینه ای جهت نمایش یافت نشد!!!',
      "emptyFilterMessage": 'گزینه ای جهت نمایش یافت نشد!!!'
      }
    );
    }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?:any) {
    this.variable.getScreenSize();
  }

}
