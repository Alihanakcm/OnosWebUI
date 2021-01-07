import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/entities/device';
import { DeviceService } from '../../../services/device-service/device.service'

@Component({
    selector: 'details-content-dialog',
    templateUrl: 'details-content-dialog.html',
    styleUrls: ['./details-content-dialog.css'],
    providers: [DeviceService]
})
export class DetailsContentDialog implements OnInit {
    deviceId;
    device: Device;
    displayedColumns: string[] = ['value'];
    constructor(private deviceService: DeviceService, public dialogRef: MatDialogRef<DetailsContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
        this.deviceId = data
    }
    ngOnInit(): void {
        this.deviceService.getDeviceById(this.deviceId.id).subscribe(data => {
            this.device = data
        });

    }
}
