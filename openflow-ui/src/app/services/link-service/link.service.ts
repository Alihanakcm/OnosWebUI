import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Link } from 'src/app/entities/link';
import { environment } from 'src/environments/environment';
@Injectable()
export class LinkService {
  constructor(private http: HttpClient) { }
  path = 'http://localhost:' + environment.port + '/links';

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.path).pipe(catchError(this.handleError));
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
