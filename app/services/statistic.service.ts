import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Configuration} from "../models/configuration.interface";
import {Period} from "../models/period.interface";
import {Metric} from "../models/metric.enum";
import {StatisticType} from "../models/statistictype.enum"


@Injectable()

export class StatisticService {
  private baseUrl = 'http://localhost:4000/statistic';

  constructor(private http: Http) {
  }

  getStatistic(metric: Metric, period: Period, type: StatisticType): Observable<any> {
    return this.http.post(this.baseUrl + '/' + metric + '/' + type, period)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
