import { Component, OnInit } from '@angular/core';
import { FlowService } from '../../services/flow-service/flow.service';
import { MessageService } from '../../services/message-service/message.service';
import { Flow } from '../../entities/flow';
@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css'],
  providers: [FlowService],
})
export class FlowsComponent implements OnInit {
  constructor(
    private flowService: FlowService,
    private messageService: MessageService
  ) {}
  flows: Flow[];
  flowDetail: Flow;
  buttons = Array(10).fill(false);

  ngOnInit(): void {
    this.flowService.getFlows().subscribe((data) => {
      this.flows = data;
    });
  }
  getFlowById(deviceId: string, flowId): void {
    this.flowService.getFlowById(deviceId, flowId).subscribe((data) => {
      this.flowDetail = data;
    });
  }
  removeFlow(deviceId: string, flowId: string): void {
    this.flowService.removeFlow(deviceId, flowId);
    this.messageService.success(flowId + ' removed');
  }
}
