import { Component, OnInit } from '@angular/core';
import { Device } from '../../entities/device';
import { Port } from '../../entities/port';
import { Flow } from '../../entities/flow';
import { DeviceService } from '../../services/device-service/device.service';
import { FlowService } from '../../services/flow-service/flow.service';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  providers: [DeviceService, FlowService],
})
export class DeviceListComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private flowService: FlowService
  ) {}
  devices: Device[];
  device: Device;
  ports: Port[];
  flows: Flow[];
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
  getDeviceById(id: string): void {
    this.deviceService.getDeviceById(id).subscribe((data) => {
      console.log(data);

      this.device = data;
    });
  }
  getPortsByDeviceId(id: string): void {
    this.deviceService.getPortsByDeviceId(id).subscribe((data) => {
      this.ports = data;
    });
  }
  changePortState(id: string, portId: string, state: string): void {
    state = `{"enabled":${state}}`;
    console.log(state);

    this.deviceService.changePortState(id, portId, state);
  }
  removeDevice(id: string): void {
    this.deviceService.removeDevice(id);
    this.ngOnInit();
  }
  getFlowsByDeviceId(deviceId: string): void {
    this.flowService.getFlowsByDeviceId(deviceId).subscribe((data) => {
      this.flows = data;
    });
  }
}
