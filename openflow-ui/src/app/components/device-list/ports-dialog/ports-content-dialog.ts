import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
    selector: 'ports-content-dialog',
    templateUrl: 'ports-content-dialog.html',
    styleUrls: ['ports-content-dialog.css'],
    providers: [DeviceService]
})
export class PortsContentDialog implements OnInit {
    deviceId;
    ports;
    displayedColumns: string[] = ['element', 'port', 'type', 'portSpeed', 'adminState', 'portMac', 'portName', 'changePortState'];
    constructor(private deviceService: DeviceService,
        private messageService: MessageService
        , public dialogRef: MatDialogRef<PortsContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
        this.deviceId = data
    }
    ngOnInit(): void {
        this.deviceService.getPortsByDeviceId(this.deviceId.id).subscribe(data => {
            this.ports = data;
        })
    }
    changePortState(id: string, portId: string, state: string): void {
        console.log("Geldi");

        state = `{"enabled":${state}}`;
        this.deviceService.changePortState(id, portId, state);
        if (state == '{"enabled":true}')
            this.messageService.success('Port ' + portId + ' opened');
        else this.messageService.warning('Port ' + portId + ' closed');
    }
}
