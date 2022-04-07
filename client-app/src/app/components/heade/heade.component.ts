import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ICurrentUser, IUser} from "../../models/data-models";
import {DialogService} from "primeng/dynamicdialog";
import {EditUserComponent} from "../../pages/base-info/users/edit-user/edit-user.component";
import {UsersService} from "../../services/users.service";
import {MessageService} from "primeng/api";
import {MemoryStorageService} from "../../services/memory-storage.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-heade',
  templateUrl: './heade.component.html',
  styleUrls: ['./heade.component.scss']
})
export class HeadeComponent implements OnInit {

   errorImage: boolean=false;
  pictureImage:string='assets/images/webp/logo.webp';


  constructor(public auth:AuthService,
              public dialogService: DialogService,
              public userService: UsersService,
              public messageService: MessageService,
              public storage: MemoryStorageService,
              public cookie: CookieService,) {
    //if (this.auth.currentUser.getValue()?.IMAGE_USER){
   //   this.pictureImage = 'data:image/jpeg;base64,'+this.auth.currentUser.getValue()?.IMAGE_USER;
 // //  }
 //   console.log('this.auth.currentUser.getValue()::',this.auth.currentUser.getValue())
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getImageUserById(this.auth.currentUser.getValue()?.ID).subscribe(res => {
      if (res.isSuccess){
        // @ts-ignore
        this.cookie.set('picture',res.data[0].IMAGE_USER);
        this.pictureImage = 'data:image/jpeg;base64,'+this.cookie.get('picture');
      }
    });
    if (this.cookie.get('picture')){
      this.pictureImage = 'data:image/jpeg;base64,'+this.cookie.get('picture');
    }
  }

  signOut() {
    debugger;
    this.auth.logout();
  }

  editUser() {

    // @ts-ignore
    this.userService.getUserById(this.auth.currentUser.getValue().ID||0).subscribe(res=>{
      if (res.isSuccess){
        this.dialogService.open(EditUserComponent, {
          data: {
            user: res.data[0]
          },
          header: 'ویرایش کاربر',
          width: '70%'
        }).onClose.subscribe((value: IUser) => {
          if (value) {
            this.userService.editUser(value).subscribe(res => {
              if (res.isSuccess) {
                this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
              } else {
                this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
              }
            }, error => {
              this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش کاربر!!!', detail: error.message});
            });
          }
        });
      }else{
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    })


  }

  onUpload(event:any,fileUpload:any) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('pictureFile', event.files[i]);

    }
    // @ts-ignore
    formData.append('userId', this.auth.currentUser.getValue()?.ID);

    this.userService.uploadPicture(formData).subscribe(res=>{
      if (res.isSuccess){
        this.cookie.set('picture',res.data[0].IMAGE_USER);
        this.pictureImage='data:image/jpeg;base64,'+res.data[0].IMAGE_USER;
        this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
      }else {
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس آپلود تصویر!!!', detail: error.message});
    });

  }

  onImgError(event: any) {
    console.log('event',event)
    this.errorImage=true
  }
}
