import { Component, Inject } from '@angular/core';

import { TRIP_NODE } from '../../types';
import { Flight } from './flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  constructor(@Inject(TRIP_NODE) readonly flight: Flight) {}
}
