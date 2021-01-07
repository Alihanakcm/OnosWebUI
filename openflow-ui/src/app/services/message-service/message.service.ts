import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}
  public _success = new Subject<string>();
  public successMessage = '';

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
}
