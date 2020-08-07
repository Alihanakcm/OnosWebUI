import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { Port } from '../../entities/port';
@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css'],
  providers: [DeviceService],
})
export class PortsComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}

  ports: Port[];
  ngOnInit(): void {
    this.deviceService.getPorts().subscribe((data) => {
      this.ports = data;
    });
  }
  changePortState(id: string, portId: string, state: string): void {
    state = `{"enabled":${state}}`;
    this.deviceService.changePortState(id, portId, state);
    this.ngOnInit();
  }
}
