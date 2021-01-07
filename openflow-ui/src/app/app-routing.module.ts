import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { PortsComponent } from './components/ports/ports.component';
import { FlowsComponent } from './components/flows/flows.component';
import { DeviceStatisticsComponent } from './components/device-statistics/device-statistics.component';
import { FlowStatisticsComponent } from './components/flow-statistics/flow-statistics.component';
import { ApplicationInstallComponent } from './components/application-install/application-install.component';
import { TopologyComponent } from './components/topology/topology.component';
import { TrafficComponent } from './components/traffic/traffic.component';

const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/ports', component: PortsComponent },
  { path: 'flows', component: FlowsComponent },
  { path: 'statistics/device', component: DeviceStatisticsComponent },
  { path: 'statistics/flows', component: FlowStatisticsComponent },
  { path: 'applications/install', component: ApplicationInstallComponent },
  { path: 'topology', component: TopologyComponent },
  { path: 'traffic', component: TrafficComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
