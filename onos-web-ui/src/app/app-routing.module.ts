import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { PortsComponent } from './components/ports/ports.component';
import { FlowsComponent } from './components/flows/flows.component';

const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/ports', component: PortsComponent },
  { path: 'flows', component: FlowsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
