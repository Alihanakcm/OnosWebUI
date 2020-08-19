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
  uploadFile(fileToUpload: File, activate: boolean): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        Authorization: 'Token',
      }),
    };
    this.http
      .post(this.path + '?activate=' + activate, fileToUpload, httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe();
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Something went wrong' + err.message;
    } else {
      errorMessage = 'System-something went wrong ' + err.message;
    }
    return throwError(errorMessage);
  }
}
