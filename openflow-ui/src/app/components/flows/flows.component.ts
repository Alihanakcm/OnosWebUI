import { Component, OnInit } from '@angular/core';
import { FlowService } from '../../services/flow-service/flow.service';
import { MessageService } from '../../services/message-service/message.service';
import { Flow } from '../../entities/flow';
import { FlowDetailContentDialog } from './flow-detail-dialog/flow-detail-content-dialog';
import { MatDialog } from '@angular/material/dialog';
import { InsertFlow } from './add-flow/insert-flow';
import { ApplicationService } from 'src/app/services/application-service/application.service';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css'],
  providers: [FlowService, ApplicationService],
})
export class FlowsComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private flowService: FlowService,
    private messageService: MessageService,
    public dialog: MatDialog,

  ) { }
  flows: Flow[];
  flowDetail: Flow;
  buttons = Array(10).fill(false);
  displayedColumns: string[] = ["state", "id", "deviceId", "details", "remove"]

  ngOnInit(): void {
    this.flowService.getFlows().subscribe((data) => {
      this.flows = data;
    });
  }
  removeFlow(deviceId: string, flowId: string): void {

    this.flowService.removeFlow(deviceId, flowId);
    this.messageService.success(flowId + ' removed');
  }
  openDetailsDialog(deviceId: string, flowId: string) {
    const dialogRef = this.dialog.open(FlowDetailContentDialog, { width: '30%', data: { deviceId: deviceId, flowId: flowId } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogCriteria() {
    const dialogRef = this.dialog.open(InsertFlow, {
      height: '500px',
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  changeApplicationState() {
    this.applicationService.activeApplicationState("org.AndasisDeleteRule.app")
    setTimeout(() => {
      this.applicationService.deactiveApplication("org.AndasisDeleteRule.app")
    }, 10000);;
  }
}
