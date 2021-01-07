import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flow } from 'src/app/entities/flow';
import { FlowService } from 'src/app/services/flow-service/flow.service';

@Component({
    selector: 'flow-detail-content-dialog',
    templateUrl: 'flow-detail-content-dialog.html',
    styleUrls: ['./flow-detail-content-dialog.css'],
    providers: [FlowService]
})
export class FlowDetailContentDialog implements OnInit {
    flow: Flow;

    constructor(private flowService: FlowService, public dialogRef: MatDialogRef<FlowDetailContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
    }
    ngOnInit(): void {
        this.flowService.getFlowById(this.data["deviceId"], this.data["flowId"]).subscribe(data => {
            this.flow = data[0]
        });

    }
}
