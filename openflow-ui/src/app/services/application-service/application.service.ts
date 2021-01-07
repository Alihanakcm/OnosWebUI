import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Application } from '../../entities/application';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApplicationService {
  constructor(private http: HttpClient) { }
  path = 'http://localhost:' + environment.port + '/applications';

  getApplications(): Observable<Application[]> {
    return this.http
      .get<Application[]>(this.path)
      .pipe(catchError(this.handleError));
  }
  getApplicationDetail(appName: string): Observable<Application> {
    return this.http.get<Application>(this.path + "/" + appName)
      .pipe(catchError(this.handleError));
  }
  uploadFile(fileToUpload: File, activate: boolean): void {
    console.log(fileToUpload);
    console.log(activate);


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
  uninstallApplication(name: string): void {
    this.http.delete(this.path + "/" + name)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  activeApplicationState(name: string) {
    console.log("OLDU");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    this.http
      .post(this.path + '/' + name + '/active', httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe();
  }
  deactiveApplication(name: string) {
    console.log("DEACTIVATED");

    this.http
      .delete(this.path + '/' + name + '/active')
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
