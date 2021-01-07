import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistic-service/statistics.service';
import { PortStatistic } from 'src/app/entities/portStatistic';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { Device } from 'src/app/entities/device';

@Component({
  selector: 'app-device-statistics',
  templateUrl: './device-statistics.component.html',
  styleUrls: ['./device-statistics.component.css'],
  providers: [StatisticsService, DeviceService],
})
export class DeviceStatisticsComponent implements OnInit {
  constructor(
    private statisticsService: StatisticsService,
    private deviceService: DeviceService
  ) {}
  devicePortStatistics: PortStatistic[];
  devices: Device[];
  getDeviceStatistics(deviceId: string): void {
    this.statisticsService.getDeviceStatistic(deviceId).subscribe((data) => {
      this.devicePortStatistics = data;
      
    });
  }
  getDeviceDeltaStatistics(deviceId: string): void {
    this.statisticsService
      .getDeviceDeltaStatistic(deviceId)
      .subscribe((data) => {
        console.log(data);

        this.devicePortStatistics = data;
      });
  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
}
