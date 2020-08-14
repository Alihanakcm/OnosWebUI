import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { Application } from '../../entities/application';
import { Device } from '../../entities/device';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { FlowService } from 'src/app/services/flow-service/flow.service';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css'],
  providers: [ApplicationService, DeviceService, FlowService],
})
export class CreateFlowComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private deviceService: DeviceService,
    private flowService: FlowService
  ) {}
  applications: Application[];
  devices: Device[];
  instructions: string = `"treatment":{"instructions":[{`;
  criterias: string = `"selector":{"criteria":[{`;
  flow: string;
  ngOnInit(): void {
    this.applicationService.getApplications().subscribe((data) => {
      this.applications = data;
    });
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
  instructionCounter = 0;
  addInstruction(type: string, value: string): void {
    if (this.instructionCounter > 0) this.instructions += ',';
    this.instructionCounter++;
    this.instructions += `"${type}":"${value}"`;
  }
  criteriaCounter = 0;
  addCriteria(type: string, value: string): void {
    if (this.criteriaCounter > 0) this.criterias += ',';
    this.criteriaCounter++;
    this.criterias += `"${type}":"${value}"`;
  }
  createFlow(
    appId: string,
    pritority: string,
    timeout: string,
    deviceId: string,
    isPermanent: string
  ): void {
    this.flow = `{"flows"  :[{"priority":"${pritority}","timeout":"${timeout}","isPermanent":"${isPermanent}","deviceId":"${deviceId}",`;
    this.flow += this.instructions;
    this.flow += `}]},`;
    this.flow += this.criterias;
    this.flow += `}]}}]}`;
    console.log(this.flow);
    console.log(JSON.parse(this.flow));
    this.flowService
      .createFlow(JSON.parse(this.flow), appId)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
