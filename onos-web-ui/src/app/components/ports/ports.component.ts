import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { Port } from '../../entities/port';
import { MessageService } from '../../services/message-service/message.service';
@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css'],
  providers: [DeviceService],
})
export class PortsComponent implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService
  ) {}

  ports: Port[];
  ngOnInit(): void {
    this.deviceService.getPorts().subscribe((data) => {
      this.ports = data;
    });
  }
  changePortState(id: string, portId: string, state: string): void {
    state = `{"enabled":${state}}`;
    this.deviceService.changePortState(id, portId, state);
    if (state == '{"enabled":true}')
      this.messageService.warning('Port ' + portId + ' closed');
    else this.messageService.success('Port ' + portId + ' opened');
  }
}
