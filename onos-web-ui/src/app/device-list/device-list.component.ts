import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './device';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  devices: Device[];
  ngOnInit(): void {
    console.log('geldi');
    this.http
      .get<Device[]>('http://localhost:5000/devices')
      .subscribe((data) => {
        this.devices = data;
      });
  }
}
