import { Component, Input, OnInit } from '@angular/core';

import { TripNode } from '../../types';
import { Flight } from './flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent implements OnInit {
  @Input()
  node: TripNode | undefined = undefined;

  flight: Flight | undefined;

  ngOnInit() {
    this.flight = this.node as Flight;
  }
}
