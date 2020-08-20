import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Device } from '../../entities/device';
import { Port } from '../../entities/port';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DeviceService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:5000/devices';

  getDevices(): Observable<Device[]> {
    return this.http
      .get<Device[]>(this.path)
      .pipe(catchError(this.handleError));
  }
  getDeviceById(id: string): Observable<Device> {
    return this.http
      .get<Device>(this.path + '/' + id)
      .pipe(catchError(this.handleError));
  }
  getPortsByDeviceId(id: string): Observable<Port[]> {
    return this.http
      .get<Port[]>(this.path + '/' + id + '/ports')
      .pipe(catchError(this.handleError));
  }
  changePortState(id: string, portId: string, state: string): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    this.http
      .post(this.path + '?id=' + id + '&portId=' + portId, state, httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe();
  }
  getPorts(): Observable<Port[]> {
    return this.http
      .get<Port[]>(this.path + '/ports')
      .pipe(catchError(this.handleError));
  }
  removeDevice(id: string) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.path + '/' + id, { responseType: 'text' })
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          console.log(response);

          if (response == 'Removed') {
            const e = false;
            if (!e) resolve(true);
            else {
              reject(false);
              retry();
            }
          }
        });
    });
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
