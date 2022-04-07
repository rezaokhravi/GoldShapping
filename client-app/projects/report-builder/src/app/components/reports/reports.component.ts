
import SweetAlert from 'sweetalert2';
import {Component, OnInit} from "@angular/core";
import {ReportsService} from "../../services/report.services";
import {EncodeService} from "../../services/encode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";



// @ts-ignore
declare var Stimulsoft: any;
declare var StiOptions: any;

@Component({
  selector: 'pn-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  title = 'نمایش فاکتور';
  options: any;
  report: any;
  viewer: any;
  reportSetting: any;
  showLoader: boolean=true;

constructor( public reportService :ReportsService,
             public enCode :EncodeService,
             private router: Router,
             private route: ActivatedRoute,) {

  this.route.paramMap.subscribe(params => {
    // @ts-ignore
    this.reportSetting = enCode.decryptData(encodeURI(params.get('data')));
    console.log('bpmnSetting::::', this.reportSetting);
  });
}

  ngOnInit(): void {


    if (this.reportSetting){
      this.showMrt();
    }
  }

  showMrt()
  {
    this.options = new Stimulsoft.Viewer.StiViewerOptions();
    this.report = new Stimulsoft.Report.StiReport();

    Stimulsoft.Base.StiLicense.key = '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHn0s4gy0Fr5YoUZ9V00Y0igCSFQzwEqYBh/N77k4f0fWXTHW5rqeBNLkaurJDenJ9o97TyqHs9HfvINK18Uwzsc/bG01Rq+x3H3Rf+g7AY92gvWmp7VA2Uxa30Q97f61siWz2dE5kdBVcCnSFzC6awE74JzDcJMj8OuxplqB1CYcpoPcOjKy1PiATlC3UsBaLEXsok1xxtRMQ283r282tkh8XQitsxtTczAJBxijuJNfziYhci2jResWXK51ygOOEbVAxmpflujkJ8oEVHkOA/CjX6bGx05pNZ6oSIu9H8deF94MyqIwcdeirCe60GbIQByQtLimfxbIZnO35X3fs/94av0ODfELqrQEpLrpU6FNeHttvlMc5UVrT4K+8lPbqR8Hq0PFWmFrbVIYSi7tAVFMMe2D1C59NWyLu3AkrD3No7YhLVh7LV0Tttr/8FrcZ8xirBPcMZCIGrRIesrHxOsZH2V8t/t0GXCnLLAWX+TNvdNXkB8cF2y9ZXf1enI064yE5dwMs2fQ0yOUG/xornE';

    Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('assets/localizations/fa.xml');
    StiOptions.WebServer.url = `${environment.serverUrl}/api/reports/dataset`;
    StiOptions.WebServer.encryptData = true;

    // @ts-ignore
    this.reportService.reportMrt().subscribe((data: Response) => {

      this.options.appearance.fullScreenMode = true;
      this.options.toolbar.showOpenButton = false;
      this.options.toolbar.showAboutButton = false;
      this.options.toolbar.showFullScreenButton = false;
      this.options.toolbar.showResourcesButton = false;
      this.options.toolbar.showParametersButton = false;
      this.options.toolbar.showFullScreenButton = false;
      this.options.toolbar.showBookmarksButton = false;
      this.options.toolbar.displayMode = Stimulsoft.Viewer.StiToolbarDisplayMode.Separated;

      this.report.load(data);

      // setVariables
      for (let vars of this.report.dictionary.variables.list) {
        console.log('vars:::',vars);
        if (this.reportSetting.params.find(p => p.name == vars.name)) {
          if (this.reportSetting.params.find(p => p.name == vars.name).value) {
            vars.value = this.reportSetting.params.find(p => p.name == vars.name).value.toString();
          }
        }
      }

      const cnn = this.enCode.encryptData("Data Source=SQLLow01.centraldnserver.com;nInitial Catalog=GoldShapping_DB; User ID=gngoldi1_sa; Password=M$bzs473;Integrated Security=false;")
      this.report.dictionary.databases.getByName("cnn").connectionString = cnn;

      this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
      this.viewer.report = this.report;
      this.viewer.renderHtml('viewer');

      this.showLoader = false;
    })
  }
}
