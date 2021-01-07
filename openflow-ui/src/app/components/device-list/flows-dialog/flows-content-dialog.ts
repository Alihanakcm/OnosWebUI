import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowService } from 'src/app/services/flow-service/flow.service';

@Component({
    selector: 'flows-content-dialog',
    templateUrl: 'flows-content-dialog.html',
    styleUrls: ['flows-content-dialog.css'],
    providers: [FlowService]
})
export class FlowsContentDialog implements OnInit {
    flows;
    deviceId;
    displayedColumns: string[] = ["groupId",
        "state",
        "life",
        "liveType", "lastSeen",
        "packets",
        "bytes",
        "id",
        "appId",
        "priority",
        "timeout",
        "isPermanent",
        "deviceId",
        "tableId",
        "tableName"]

    constructor(private flowService: FlowService, public dialogRef: MatDialogRef<FlowsContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
        this.deviceId = data
    }
    ngOnInit(): void {
        this.flowService.getFlowsByDeviceId(this.deviceId.id).subscribe(data => {
            this.flows = data
            console.log(data);

        })
    }
}
