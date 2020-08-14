import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SectionComponent } from './components/section/section.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { PortsComponent } from './components/ports/ports.component';
import { FlowsComponent } from './components/flows/flows.component';
import { CreateFlowComponent } from './components/create-flow/create-flow.component';
import { DeviceStatisticsComponent } from './components/device-statistics/device-statistics.component';
import { FlowStatisticsComponent } from './components/flow-statistics/flow-statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SectionComponent,
    DeviceListComponent,
    ModalComponent,
    PortsComponent,
    FlowsComponent,
    CreateFlowComponent,
    DeviceStatisticsComponent,
    FlowStatisticsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
