import { Component, OnInit } from '@angular/core';
import { Device } from '../../entities/device';
import { Port } from '../../entities/port';
import { Flow } from '../../entities/flow';
import { DeviceService } from '../../services/device-service/device.service';
import { FlowService } from '../../services/flow-service/flow.service';
import { MessageService } from '../../services/message-service/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  providers: [DeviceService, FlowService],
})
export class DeviceListComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private flowService: FlowService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {}
  devices: Device[];
  deviceDetail: Device;
  ports: Port[];
  flows: Flow[];
  buttons = Array();
  removedDevices = Array();
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
  getDeviceById(id: string): void {
    console.log(this.removedDevices);

    this.deviceService.getDeviceById(id).subscribe((data) => {
      this.deviceDetail = data;
    });
  }
  getPortsByDeviceId(id: string): void {
    this.deviceService.getPortsByDeviceId(id).subscribe((data) => {
      this.ports = data;
    });
  }
  changePortState(id: string, portId: string, state: string): void {
    state = `{"enabled":${state}}`;
    this.deviceService.changePortState(id, portId, state);
    if (state == '{"enabled":true}')
      this.messageService.success('Port ' + portId + ' closed');
    else this.messageService.success('Port ' + portId + ' closed');
  }
  removeDevice(id: string, i: number): void {
    this.spinner.show();
    this.deviceService.removeDevice(id);
    this.messageService.success(id + ' Device removed succesfully');
    this.buttons.push(i);
    setTimeout(() => {
      this.spinner.hide();
      location.reload();
    }, 2000);
  }
  getFlowsByDeviceId(deviceId: string): void {
    this.flowService.getFlowsByDeviceId(deviceId).subscribe((data) => {
      this.flows = data;
    });
  }
}
