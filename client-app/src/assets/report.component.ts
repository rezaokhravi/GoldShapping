import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReportService} from '../../Services/report.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../../Services/auth.service';
import {ConfigService, settings} from '../../Services/config.service';
import {MemoryStorageServices} from '../../Services/memory-storage.service';
import {CurrentUser} from '../../DTOs/Account/currentUser';
import SweetAlert from 'sweetalert2';
import {CookieService} from 'ngx-cookie-service';
import {EnCode} from '../../DTOs/Encodeing/EnCode';
import {IReportDataSource} from '../../DTOs/Report/IReportDataSource';


declare var Stimulsoft: any;
declare var StiOptions: any;

@Component({
  selector: 'pnReport-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  report: any;
  options: any;
  designer: any;
  viewer: any;
  reportName: string;
  reportTitle: string;
  reportSetting: IReportDataSource;
  currentUser: CurrentUser;
  organizations: any[] = [];
  selectedOrganizations: any;
  showLoader: boolean = true;

  constructor(public rptService: ReportService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private storage: MemoryStorageServices,
              private config: ConfigService,
              private auth: AuthService,
              private cookie: CookieService) {
    try {
      this.reportSetting = EnCode.decryptData(encodeURI(this.route.snapshot.queryParams.data));
      this.organizations = this.config.getOrganization();
      if (this.organizations.find(items => items.organizationName == this.reportSetting.organization)) {
        this.selectedOrganizations = this.organizations.filter(items => items.organizationName == this.reportSetting.organization);
      } else {
        this.selectedOrganizations = this.organizations[0];
      }
      this.config.setConfigJson(this.selectedOrganizations, true);
      title.setTitle(this.config.getKey(settings.title,true) ? this.config.getKey(settings.title, true) : 'سیسیتم طرح جامع');
      document.getElementById('appFavicon').setAttribute('href', `assets/Icons/organizations/${this.config?.getKey(settings.icon, true)}`);
    } catch (e) {
      console.error(e);
    }
  }

  ngOnInit(): void {
    try {
      if (this.route.snapshot.queryParams.data) {
        this.title.setTitle(this.config.getKey(settings.title) ? this.config.getKey(settings.title, true) : 'سیسیتم طرح جامع');
        document.getElementById('appFavicon').setAttribute('href', `assets/Icons/organizations/${this.config?.getKey(settings.icon, true)}`);
        this.cookie.set('token', this.reportSetting.token, 1);
        this.auth.getLoginUser().subscribe(result => {
          if (result.IsSuccess) {
            this.auth.setCurrentUser(result).then(value => {
              this.auth.getCurrentUser().subscribe(user => {
                this.currentUser = user;
                this.getReport();
              });
            });
          } else {
            this.auth.logout();
            this.router.navigate(['/PageNotFound']);
          }
        });
      } else {
        this.auth.logout();
        this.router.navigate(['/PageNotFound']);
      }
    } catch (e) {
    }
  }

  getReport() {
    try {

      //Activation with using license file
      //Stimulsoft.Base.StiLicense.loadFromFile("license.key");

      //Activation with using license code
      Stimulsoft.Base.StiLicense.key = '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkcgIvwL0jnpsDqRpWg5FI5kt2G7A0tYIcUygBh1sPs7plofUOqPB1a4HBIXJB621mau2oiAIj+ysU7gKUXfjn/D5BocmduNB+ZMiDGPxFrAp3PoD0nYNkkWh8r7gBZ1v/JZSXGE3bQDrCQCNSy6mgby+iFAMV8/PuZ1z77U+Xz3fkpbm6MYQXYp3cQooLGLUti7k1TFWrnawT0iEEDJ2iRcU9wLqn2g9UiWesEZtKwI/UmEI2T7nv5NbgV+CHguu6QU4WWzFpIgW+3LUnKCT/vCDY+ymzgycw9A9+HFSzARiPzgOaAuQYrFDpzhXV+ZeX31AxWlnzjDWqpfluygSNPtGul5gyNt2CEoJD1Yom0VN9fvRonYsMsimkFFx2AwyVpPcs+JfVBtpPbTcZscnzUdmiIvxv8Gcin6sNSibM6in/uUKFt3bVgW/XeMYa7MLGF53kvBSwi78poUDigA2n12SmghLR0AHxyEDIgZGOTbNI33GWu7ZsPBeUdGu55R8w=\n';
      //Stimulsoft.Base.StiLicense.key = '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHn0s4gy0Fr5YoUZ9V00Y0igCSFQzwEqYBh/N77k4f0fWXTHW5rqeBNLkaurJDenJ9o97TyqHs9HfvINK18Uwzsc/bG01Rq+x3H3Rf+g7AY92gvWmp7VA2Uxa30Q97f61siWz2dE5kdBVcCnSFzC6awE74JzDcJMj8OuxplqB1CYcpoPcOjKy1PiATlC3UsBaLEXsok1xxtRMQ283r282tkh8XQitsxtTczAJBxijuJNfziYhci2jResWXK51ygOOEbVAxmpflujkJ8oEVHkOA/CjX6bGx05pNZ6oSIu9H8deF94MyqIwcdeirCe60GbIQByQtLimfxbIZnO35X3fs/94av0ODfELqrQEpLrpU6FNeHttvlMc5UVrT4K+8lPbqR8Hq0PFWmFrbVIYSi7tAVFMMe2D1C59NWyLu3AkrD3No7YhLVh7LV0Tttr/8FrcZ8xirBPcMZCIGrRIesrHxOsZH2V8t/t0GXCnLLAWX+TNvdNXkB8cF2y9ZXf1enI064yE5dwMs2fQ0yOUG/xornE';

      //Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("./Content/Roboto-Black.ttf");
      Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('assets/localizations/fa.xml');
      if (this.currentUser) {
        if (this.reportSetting) {
          if (this.reportSetting.reportType == 'preview') {
            this.reportName = this.reportSetting.name;
            this.getViewer();
          } else if (this.reportSetting.reportType == 'design') {
            if (this.currentUser.IsAdmin) {
              this.reportName = this.reportSetting.name;
              this.getDesigner();
            } else {
              SweetAlert.fire({
                icon: 'error',
                text: 'شما مجوز طراحی گزارش را ندارد!!!',
                timer: 2000
              }).then(() => {
                this.storage.removeAllStorage();
                this.router.navigate(['/PageNotFound']);
              });
            }
          }
        } else {
          SweetAlert.fire({
            icon: 'error',
            text: 'گزارش درخواست شده موجود نمی باشد!!!',
            timer: 2000
          }).then(() => {
            this.storage.removeAllStorage();
            this.router.navigate(['/PageNotFound']);
          });
        }
      } else {
        this.router.navigate(['/PageNotFound']);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getViewer() {
    try {
      StiOptions.WebServer.url = `${this.config.getKey(settings.server, true)}database/`;
      this.options = new Stimulsoft.Viewer.StiViewerOptions();
      this.report = new Stimulsoft.Report.StiReport();
      this.rptService.getReport(String(this.reportSetting.referenceId), this.reportName)
        .subscribe(result => {
          if (result.IsSuccess) {
            this.reportTitle = result.Data[0].title;
            this.title.setTitle(this.reportTitle);
            this.report.load(result.Data[0].content);

            // setVariables
            for (let vars of this.report.dictionary.variables.list) {
              if (this.reportSetting.params.find(p => p.name == vars.name)) {
                if (this.reportSetting.params.find(p => p.name == vars.name).value) {
                  vars.value = this.reportSetting.params.find(p => p.name == vars.name).value.toString();
                }
              }
            }
            this.options.appearance.fullScreenMode = true;
            this.options.toolbar.showOpenButton = false;
            this.options.toolbar.showAboutButton = false;
            this.options.toolbar.showFullScreenButton = false;
            this.options.toolbar.showResourcesButton = false;
            this.options.toolbar.showParametersButton = false;
            this.options.toolbar.showFullScreenButton = false;
            this.options.toolbar.showBookmarksButton = false;
            this.options.toolbar.displayMode = Stimulsoft.Viewer.StiToolbarDisplayMode.Separated;
            this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
            this.viewer.report = this.report;
            this.viewer.renderHtml('viewer');
            this.showLoader = false;
          }
        });
    } catch (e) {
    }
  }


  getDesigner() {
    try {
      StiOptions.WebServer.url = `${this.config.getKey(settings.server, true)}database/`;
      this.options = new Stimulsoft.Designer.StiDesignerOptions();
      this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);
      this.report = Stimulsoft.Report.StiReport.createNewReport();
      var report_id: string = '';

      this.rptService.getReport(String(this.reportSetting.referenceId), this.reportName)
        .subscribe(result => {
          if (result.IsSuccess) {
            this.reportTitle = result.Data[0].title;
            this.title.setTitle(this.reportTitle);
            report_id = result.Data[0].id.toString();
            if (result.Data[0].content != '{}') {
              this.report.load(result.Data[0].content);
            }
            // setVariables
            for (let vars of this.report.dictionary.variables.list) {
              if (this.reportSetting.params.find(p => p.name == vars.name)) {
                vars.value = this.reportSetting.params.find(p => p.name == vars.name).value;
              }
            }
          }
        }, error => {
        }, () => {
          this.options.appearance.fullScreenMode = true;
          this.options.toolbar.showPreviewButton = true;
          this.options.toolbar.showFileMenu = true;
          this.options.components.showImage = true;
          this.options.components.showShape = true;
          this.options.components.showPanel = true;
          this.options.components.showCheckBox = true;
          this.options.components.showSubReport = true;
          this.designer.report = this.report;
          this.designer.renderHtml('designer');
          this.designer.onSaveReport = (args) => {
            args.fileName = this.reportName;
            var report = args.report;
            report.ReportFile = this.reportName;
            report._reportFile = `${this.reportName}.mrt`;
            report._reportAlias = this.reportName;
            report._reportName = this.reportName;
            var str = report.saveToJsonString().replace(new RegExp('\'', 'g'), '\'\'');
            this.rptService.setReport(str, report_id).subscribe(result => {
              if (result.IsSuccess) {
                SweetAlert.fire({
                  icon: 'success',
                  title: '.گزارش با موفقیت ذخیره گردید',
                  showConfirmButton: false,
                  timer: 2000
                }).then(() => {
                  if (this.reportSetting.backToPreview) {
                    this.showPreview();
                  }
                });

              }
            });
            this.title.setTitle(this.reportTitle);
          };
          this.showLoader = false;
        });
    } catch (e) {
    }
  }

  showDesign() {
    try {
      this.reportSetting.reportType = 'design';
      this.reportSetting.backToPreview = true;
      const reportDate = EnCode.encryptData(this.reportSetting);
      const link = document.createElement('a');
      link.target = '_self';
      link.href = `${this.config.getKey(settings.report, true)}?data=${encodeURIComponent(reportDate)}`;
      link.setAttribute('visibility', 'hidden');
      link.click();
    } catch (e) {
    }
  }

  showPreview() {
    try {
      this.reportSetting.reportType = 'preview';
      this.reportSetting.backToPreview = false;
      const reportDate = EnCode.encryptData(this.reportSetting);
      const link = document.createElement('a');
      link.target = '_self';
      link.href = `${this.config.getKey(settings.report, true)}?data=${encodeURIComponent(reportDate)}`;
      link.setAttribute('visibility', 'hidden');
      link.click();
    } catch (e) {
    }
  }
}
