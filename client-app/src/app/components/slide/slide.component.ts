import {Component, OnInit, Output} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {VariablesService} from "../../services/variables.service";
import {MenuItem, MessageService} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';
import {MenuService} from "../../services/menu.service";
import {IMenu} from "../../models/data-models";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    MessageService
  ]
})
export class SlideComponent implements OnInit {

  menus: any[] = [];
  loading: boolean = false;
  displaySubmenu:boolean=false;

  constructor(
    public variable: VariablesService,
    public menuService: MenuService,
    public authService: AuthService,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.loading = true;

  }

  ngOnInit(): void {
    this.menus=[];
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.menus=[];
        this.menuService.getAllMenuByUserId(user?.ID || 0).subscribe(res => {
          if (res.isSuccess) {

            let rootRoute = res.data.find(m => m.IS_ROUTER_ACTIVE == true)?.ROUTE ? res.data.find(m => m.IS_ROUTER_ACTIVE == true).ROUTE : res.data[0].ROUTE;
            let rootMenu = res.data.filter(m => m.MENU_ID == null);
            let subMenu = res.data.filter(m => m.MENU_ID != null);

            rootMenu.forEach(rm => {
              this.menus.push(Object.assign(rm, {CHILD: []}));
            });

            subMenu.forEach(sm => {
              // @ts-ignore
			  let findMenu = this.menus.find(m => m.ID == sm.MENU_ID);
			  if(findMenu){
			  findMenu.CHILD.push(sm);
			  }
            });
            this.router.navigate([rootRoute]).then(value => {
            });
            this.loading = false;

          } else {
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            this.router.navigate(['noPermission']).then(value => {
            });
            this.loading = false;
          }
        })
      }
    });

  }

  onClickMenu() {
    if (this.variable.isMobile.getValue() == true) {
      this.variable.toggleMenu.next(false);
    }
  }

  styles() {
    let innerWidth =window.innerHeight;
    return {
      'height':(innerWidth - 50 ) +'px'
    }
  }
}
