export class PortStatistic {
  port: number;
  packetReceived: number;
  packetSent: number;
  bytesReceived: number;
  bytesSent: number;
  packetRxDropped: number;
  packetTxDropped: number;
  packetRxErrors: number;
  packetTxErrors: number;
  durationSec: number;
}
