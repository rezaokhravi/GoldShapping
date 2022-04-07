import { Component, OnInit } from '@angular/core';
import {IDomains, IMenu} from "../../../models/data-models";
import {Table} from "primeng/table";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {DialogService} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";
import {DomainsService} from "../../../services/domains.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EditDomainComponent} from "./edit-domain/edit-domain.component";

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class DomainComponent implements OnInit {

  loading: boolean=false;
  domains: any[]=[];
  selectedDomId: number=0;
  domainForm: FormGroup;
  domainTitle: any[]=[];
  selectedDomain: any;

  constructor(
    public messageService: MessageService,
    public domainsService:DomainsService,
    public dialogService: DialogService,
    private fb: FormBuilder
  ) {

    this.domainForm =
      this.fb.group(
        {
          ID: [null, Validators.required],
        }
      );

    this.domainsService.getDomainTitle().subscribe(res => {
      if (res.isSuccess) {
        this.domainTitle = res.data;
      }
    });

  }

  ngOnInit(): void {


    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.domainsService.getAllDomainById(this.selectedDomId).subscribe(res => {
      if (res.isSuccess) {
        this.domains = res.data;
        this.loading = false;
      } else {
        this.domains=[];
        this.loading = false;
        this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
      }
    }, error => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary: 'خطا در سرویس بروزرسانی ثبات ها!!!', detail: error.message});
    })
  }

  clear(table: Table) {
    table.clear();
  }

  search(event:any, dt: Table) {
    dt.filterGlobal(event.target.value, 'contains')
  }

  editMenu(domain:IDomains) {
    this.dialogService.open(EditDomainComponent, {
      data: {
        domId:this.selectedDomId,
        domain:domain
      },
      header: 'ویرایش ثبات',
      width: '90%'
    }).onClose.subscribe((value) => {
      if (value){
        this.loading = true;
        this.domainsService.editDomain(value).subscribe(res => {
          if (res.isSuccess) {
            this.refresh();
            this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
          } else {
            this.loading = false;
            this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
          }
        }, error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'خطا در سرویس ویرایش ثبات!!!', detail: error.message});
        });
      }
    });
  }

  deleteMenu(domain:IDomains) {
    let title: string = `آیا می خواهید ثبات ${domain.TITLE}  حذف شود ؟`;
    Swal.fire({
      title: title,
      text: "در صورت حذف امکان بازیابی ثبات نمی باشد!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی, حذف شود!',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.domainsService.deleteDomain(domain)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              Swal.fire({
                  title: 'حذف ثبات',
                  html: ` ثبات ${domain.TITLE}  با موفقیت حذف گردید.`,
                  icon: 'success',
                  confirmButtonText: 'تایید',
                }
              );
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس حذف ثبات!!!', detail: error.message});
          });

      }
    });
  }

  createMenu() {
    this.dialogService.open(EditDomainComponent, {
      data: {
        domId:this.selectedDomId,
        domain:null
      },
      header: 'ایجاد ثبات',
      width: '70%'
    }).onClose.subscribe(value=>{
      if (value){
        this.loading = true;
        this.domainsService.addDomain(value)
          .subscribe(res => {
            if (res.isSuccess) {
              this.refresh();
              this.messageService.add({severity: 'success', summary: res.faMessage, detail: ''});
            } else {
              this.loading = false;
              this.messageService.add({severity: 'warn', summary: res.faMessage, detail: res.enMessage});
            }
          }, error => {
            this.loading = false;
            this.messageService.add({severity: 'error', summary: 'خطا در سرویس ایجاد ثبات!!!', detail: error.message});
          });
      }
    });
  }
}
