import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Topology } from '../../entities/topology'
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TopologyService {

  constructor(private http: HttpClient) { }
  path = 'http://localhost:' + environment.port + '/topology';

  getTopology(): Observable<Topology> {
    return this.http.get<Topology>(this.path).pipe(catchError(this.handleError));
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
