import { Instruction } from './instruction'
import { Criteria } from './criteria'

export class Flow {
  groupId: number;
  state: string;
  life: number;
  liveType: string;
  lastSeen: string;
  packets: number;
  bytes: number;
  id: string;
  appId: string;
  priority: number;
  timeout: string;
  isPermanent: boolean;
  deviceId: string;
  tableId: number;
  tableName: number;
  treatment: any = {"instructions":[]} //{ instructions: [{ type: string; port: string }]; deferred: [] };
  selector: any = {"criteria":[]} //{ criteria: [{ type: string; ethType: string }] };
}
