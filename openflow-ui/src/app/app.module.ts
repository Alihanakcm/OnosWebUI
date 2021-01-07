import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import { NavigationComponent } from './components/navigation/navigation.component';
import { SectionComponent } from './components/section/section.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { PortsComponent } from './components/ports/ports.component';
import { FlowsComponent } from './components/flows/flows.component';
import { DeviceStatisticsComponent } from './components/device-statistics/device-statistics.component';
import { FlowStatisticsComponent } from './components/flow-statistics/flow-statistics.component';
import { ApplicationInstallComponent } from './components/application-install/application-install.component';
import { TopologyComponent } from './components/topology/topology.component';

import { InsertFlow } from './components/flows/add-flow/insert-flow'
import { DetailsContentDialog } from "./components/device-list/details-dialog/details-content-dialog";
import { PortsContentDialog } from "./components/device-list/ports-dialog/ports-content-dialog";
import { FlowsContentDialog } from "./components/device-list/flows-dialog/flows-content-dialog";
import { FlowDetailContentDialog } from "./components/flows/flow-detail-dialog/flow-detail-content-dialog";
import { AppDetailsComponent } from './components/application-install/app-details/app-details.component';




import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table'
import { MatList, MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { TrafficComponent } from './components/traffic/traffic.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SectionComponent,
    DeviceListComponent,
    PortsComponent,
    FlowsComponent,
    DeviceStatisticsComponent,
    FlowStatisticsComponent,
    ApplicationInstallComponent,
    InsertFlow,
    DetailsContentDialog,
    PortsContentDialog,
    FlowsContentDialog,
    FlowDetailContentDialog,
    AppDetailsComponent,
    TopologyComponent,
    TrafficComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
