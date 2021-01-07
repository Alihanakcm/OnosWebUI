import { SimulationNodeDatum } from 'd3';

export class Device implements SimulationNodeDatum {
  public x: number;
  public y: number;
  constructor(public nodeId: number) { }
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
    managementAddress: string;
    protocol: string;
  };
}
