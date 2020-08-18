import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApplicationService } from '../../services/application-service/application.service';


@Component({
  selector: 'app-application-install',
  templateUrl: './application-install.component.html',
  styleUrls: ['./application-install.component.css'],
  providers: [ApplicationService],
})
export class ApplicationInstallComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];
  constructor(private applicationService: ApplicationService) {}
  ngOnInit(): void {}
  installApplication(file, activate: boolean): void {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.applicationService
      .installApplication(formData, activate)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          console.log(event.body);
        }
      });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.installApplication(file, false);
    });
  }
}
