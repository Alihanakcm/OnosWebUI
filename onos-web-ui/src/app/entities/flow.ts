export class Flow {
  groupId: number;
  state: string;
  life: number;
  liveType: string;
  lasatSeen: string;
  packets: number;
  bytes: number;
  id: string;
  appId: string;
  priority: number;
  timeout: string;
  isPermanent: boolean;
  deviceId: number;
  tableName: number;
  treatment: { instructions: [{ type: string; port: string }]; deferred: [] };
  selector: { criteria: [{ type: string; ethType: string }] };
}
