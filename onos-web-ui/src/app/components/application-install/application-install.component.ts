import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { MessageService } from '../../services/message-service/message.service';
@Component({
  selector: 'app-application-install',
  templateUrl: './application-install.component.html',
  styleUrls: ['./application-install.component.css'],
  providers: [ApplicationService],
})
export class ApplicationInstallComponent implements OnInit {
  files = [];
  fileSelected = false;
  fileName = 'Choose File';
  fileToUpload: File = null;
  wrongFile;
  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.name.split('.').pop() == 'oar') {
      this.fileName = this.fileToUpload.name;
      this.fileSelected = true;
      this.wrongFile = false;
    } else {
      this.wrongFile = true;
      this.fileSelected = false;
    }
  }
  uploadFileToActivity(activate: boolean) {
    this.applicationService.uploadFile(this.fileToUpload, activate);
    this.messageService.success(this.fileName + ' succesfully uploaded');
  }
}
