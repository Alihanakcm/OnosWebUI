import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PortStatistic } from '../../entities/portStatistic';
import { Table } from '../../entities/table';
import { Link } from 'src/app/entities/link';

@Injectable()
export class StatisticsService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:5000/statistics';

  getDeviceStatistic(deviceId: string): Observable<PortStatistic[]> {
    return this.http
      .get<PortStatistic[]>(this.path + '/ports/' + deviceId)
      .pipe(catchError(this.handleError));
  }
  getDeviceDeltaStatistic(deviceId: string): Observable<PortStatistic[]> {
    return this.http
      .get<PortStatistic[]>(this.path + '/delta/ports/' + deviceId)
      .pipe(catchError(this.handleError));
  }
  getFlowsTableStatisticsByDeviceId(deviceId: string): Observable<Table[]> {
    return this.http
      .get<Table[]>(this.path + '/flows/tables/' + deviceId)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Something went wrong' + err.error.message;
    } else {
      errorMessage = 'System-something went wrong ' + err.error.message;
    }
    return throwError(errorMessage);
  }
}
