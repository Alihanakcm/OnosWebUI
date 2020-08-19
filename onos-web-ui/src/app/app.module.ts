import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SectionComponent } from './components/section/section.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { PortsComponent } from './components/ports/ports.component';
import { FlowsComponent } from './components/flows/flows.component';
import { CreateFlowComponent } from './components/create-flow/create-flow.component';
import { DeviceStatisticsComponent } from './components/device-statistics/device-statistics.component';
import { FlowStatisticsComponent } from './components/flow-statistics/flow-statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationInstallComponent } from './components/application-install/application-install.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SectionComponent,
    DeviceListComponent,
    PortsComponent,
    FlowsComponent,
    CreateFlowComponent,
    DeviceStatisticsComponent,
    FlowStatisticsComponent,
    ApplicationInstallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
