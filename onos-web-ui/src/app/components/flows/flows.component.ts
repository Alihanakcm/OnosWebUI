import { Component, OnInit } from '@angular/core';
import { FlowService } from '../../services/flow-service/flow.service';
import { Flow } from '../../entities/flow';
@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css'],
  providers: [FlowService],
})
export class FlowsComponent implements OnInit {
  constructor(private flowService: FlowService) {}
  flows: Flow[];
  flow: Flow;
  ngOnInit(): void {
    this.flowService.getFlows().subscribe((data) => {
      this.flows = data;
    });
  }
  getFlowById(deviceId: string, flowId): void {
    this.flowService.getFlowById(deviceId, flowId).subscribe((data) => {
      console.log(data);
      
      this.flow = data;
    });
  }
}
