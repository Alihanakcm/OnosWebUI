import { Component, OnInit } from '@angular/core';
import { Device } from '../../entities/device';
import { Port } from '../../entities/port';
import { DeviceService } from '../../services/device-service/device.service';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  providers: [DeviceService],
})
export class DeviceListComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}
  devices: Device[];
  device: Device;
  ports: Port[];
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
  getDeviceById(id: string): void {
    this.deviceService.getDeviceById(id).subscribe((data) => {
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
}
