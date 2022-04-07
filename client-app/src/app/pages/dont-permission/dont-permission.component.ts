import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dont-permission',
  templateUrl: './dont-permission.component.html',
  styleUrls: ['./dont-permission.component.scss'],
  providers: [
    MessageService
  ]
})
export class DontPermissionComponent implements OnInit {
  constructor(public authService: AuthService,public messageService: MessageService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }
}
