import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Application } from 'src/app/entities/application';
import { ApplicationService } from '../../services/application-service/application.service';
import { MessageService } from '../../services/message-service/message.service';
import { MatDialog } from '@angular/material/dialog';
import { AppDetailsComponent } from './app-details/app-details.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-application-install',
  templateUrl: './application-install.component.html',
  styleUrls: ['./application-install.component.css'],
  providers: [ApplicationService],
})
export class ApplicationInstallComponent implements OnInit {
  applications: Application[];
  displayedColumns = ["id", "name", "version", "category", "details", "delete"];
  buttons = Array(10).fill(false);
  files = [];
  fileSelected = false;
  fileName = 'Choose File';
  fileToUpload: File = null;
  wrongFile;
  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data
    })
  }

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
  openDetailsDialog(appName: string) {
    const dialogRef = this.dialog.open(AppDetailsComponent, { width: '30%', data: { name: appName } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } uninstallApplication(name: string) {
    this.applicationService.uninstallApplication(name)
    this.messageService.success("Uninstalled " + name);
  }
  checkIfRemoved() { }

}
