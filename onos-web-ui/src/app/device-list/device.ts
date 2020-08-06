export class Device {
  id: string;
  type: string;
  available: boolean;
  role: string;
  mfr: string;
  hw: string;
  sw: string;
  serial: string;
  driver: string;
  chassisId: string;
  lastUpdate: string;
  humanReadableLastUpdate: string;
  annotations: {
    channelId: string;
    managemenetAddress: string;
    protocol: string;
  };
}
