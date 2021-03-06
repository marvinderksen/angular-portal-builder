import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DirectionsComponent } from './directions/directions.component';
import { NodeHostComponent } from './directions/node-host/node-host.component';
import { CabComponent } from './node-types/cab/cab.component';
import { FlightComponent } from './node-types/flight/flight.component';
import { TrainModule } from './node-types/train/train.module';
import { WalkModule } from './node-types/walk/walk.module';
import { TripPointComponent } from './trip-point/trip-point.component';

@NgModule({
  declarations: [
    AppComponent,
    TripPointComponent,
    DirectionsComponent,
    FlightComponent,
    CabComponent,
    NodeHostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PortalModule,
    TrainModule,
    WalkModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
