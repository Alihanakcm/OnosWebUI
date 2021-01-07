import { Component, OnInit, Inject } from '@angular/core';
import { Device } from '../../entities/device';
import { Port } from '../../entities/port';
import { Flow } from '../../entities/flow';
import { DeviceService } from '../../services/device-service/device.service';
import { FlowService } from '../../services/flow-service/flow.service';
import { MessageService } from '../../services/message-service/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DetailsContentDialog } from './details-dialog/details-content-dialog'
import { PortsContentDialog } from './ports-dialog/ports-content-dialog'
import { FlowsContentDialog } from './flows-dialog/flows-content-dialog'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  providers: [DeviceService, FlowService],
})
export class DeviceListComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) { }
  devices: Device[];
  deviceDetail: Device;
  ports: Port[];
  flows: Flow[];
  buttons = Array(10).fill(false);
  removedDevices = Array();
  displayedColumns = ['id', 'type', 'available', "details", "ports", "flows", "remove"];

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
      this.getRemovedDevices();
    });
  }
  getRemovedDevices(): void {
    this.devices.forEach((item) => {
      this.deviceService.getPortsByDeviceId(item.id).subscribe((portData) => {
        this.ports = portData;
        if (this.ports.length == 0) this.removedDevices.push(item.id);
      });
    });
  }
  checkIfRemoved(deviceId: string): boolean {
    return this.removedDevices.includes(deviceId);
  }


  removeDevice(id: string, i: number): void {
    this.deviceService.removeDevice(id).then((result) => {
      if (result) {
        this.messageService.success(id + ' Device removed succesfully');
        this.spinner.hide();
      }
    });
  }
  openDetailsDialog(deviceId: string) {
    const dialogRef = this.dialog.open(DetailsContentDialog, { width: '30%', data: { id: deviceId } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openPortsDialog(deviceId: string) {
    const dialogRef = this.dialog.open(PortsContentDialog, { width: '100%', data: { id: deviceId } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openFlowsDialog(deviceId: string) {
    const dialogRef = this.dialog.open(FlowsContentDialog, { width: '100%', data: { id: deviceId } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

