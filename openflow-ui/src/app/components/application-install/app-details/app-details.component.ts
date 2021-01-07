import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/entities/application';
import { ApplicationService } from '../../../services/application-service/application.service'

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css'],
  providers:[ApplicationService]
})
export class AppDetailsComponent implements OnInit {
  appName;
  application: Application;
  displayedColumns: string[] = ['value'];
  constructor(private applicationService: ApplicationService,
    public dialogRef: MatDialogRef<AppDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.appName = data
  }
  ngOnInit(): void {
    this.applicationService.getApplicationDetail(this.appName.name).subscribe(data => {
      this.application = data
    })
  }

}
