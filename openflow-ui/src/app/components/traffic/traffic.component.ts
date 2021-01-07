import { Component, OnInit } from '@angular/core';
import { PortStatistic } from 'src/app/entities/portStatistic';
import { TrafficData } from 'src/app/entities/traffic-data';
import { StatisticsService } from 'src/app/services/statistic-service/statistics.service';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css'],
  providers: [StatisticsService]
})
export class TrafficComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }
  ddosInfo: TrafficData;
  devicePortStatistics: PortStatistic[];

  ngOnInit(): void {
    this.statisticsService
      .getDeviceDeltaStatisticForTraffic()
      .subscribe((data) => {
        this.devicePortStatistics = data;
      });
    this.statisticsService.getDdosInfo().subscribe(data => {
      this.ddosInfo = data;
    });
    setTimeout(() => { this.ngOnInit() },
      1000)
  }
}
