import { Component, Input } from '@angular/core';

import { TripNode } from '../types';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent {
  @Input()
  directions: TripNode[] | undefined;

  constructor() {}
}
