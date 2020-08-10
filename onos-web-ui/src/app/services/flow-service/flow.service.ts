import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flow } from '../../entities/flow';

@Injectable()
export class FlowService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:5000/flows';
  getFlows(): Observable<Flow[]> {
    return this.http.get<Flow[]>(this.path).pipe(catchError(this.handleError));
  }
  getFlowById(deviceId: string, flowId: string): Observable<Flow> {
    return this.http
      .get<Flow>(this.path + '/' + deviceId + '/' + flowId)
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