import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IPublicRequest} from "../models/request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private serveUrl = environment.serverUrl;  // URL to web api
  private reportUrl = environment.reportUrl;  // URL to web api



  constructor(private http: HttpClient) {
  }

  reportDataset(): Observable<IPublicRequest> {
    return this.http.get<IPublicRequest>(`${this.serveUrl}/reports/dataset`
    ).pipe(
      catchError(this.handleError<IPublicRequest>('reportDataset'))
    );
  }

  reportMrt() {
    // @ts-ignore
      return this.http.get(`${this.reportUrl}/assets/reports/rpt2.mrt`)
        .pipe(
          catchError(this.handleError<IPublicRequest>('reportDataset'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
