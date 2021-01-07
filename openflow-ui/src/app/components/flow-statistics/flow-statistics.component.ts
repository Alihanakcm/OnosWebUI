import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistic-service/statistics.service';
import { Table } from 'src/app/entities/table';
import { Device } from 'src/app/entities/device';
import { Link } from 'src/app/entities/link';
import { DeviceService } from 'src/app/services/device-service/device.service';

@Component({
  selector: 'app-flow-statistics',
  templateUrl: './flow-statistics.component.html',
  styleUrls: ['./flow-statistics.component.css'],
  providers: [StatisticsService, DeviceService],
})
export class FlowStatisticsComponent implements OnInit {
  constructor(
    private statisticsService: StatisticsService,
    private deviceService: DeviceService
  ) {}
  flowTableStatistics: Table[];
  devices: Device[];
  flowsLinks: Link[];
  getFlowsTableStatisticsByDeviceId(deviceId: string) {
    this.statisticsService
      .getFlowsTableStatisticsByDeviceId(deviceId)
      .subscribe((data) => {

        this.flowTableStatistics = data;
        console.log(data);
        

      });
  }
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
}
