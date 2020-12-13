import { Component, EventEmitter, Output } from '@angular/core';

import { cities } from '../data';

@Component({
  selector: 'app-trip-point',
  templateUrl: './trip-point.component.html',
  styleUrls: ['./trip-point.component.scss'],
})
export class TripPointComponent {
  @Output()
  selected = new EventEmitter<string>();

  readonly cities = cities;

  constructor() {}

  publishChange(selectedCity: string) {
    this.selected.emit(selectedCity);
  }
}
