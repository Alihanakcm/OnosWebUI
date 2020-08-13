import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Application } from '../../entities/application';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApplicationService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:5000/applications';

  getApplications(): Observable<Application[]> {
    return this.http
      .get<Application[]>(this.path)
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
