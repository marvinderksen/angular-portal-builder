import { Component, Inject, OnInit } from '@angular/core';

import { TRIP_NODE } from '../../types';
import { Walk } from './walk';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.scss'],
})
export class WalkComponent implements OnInit {
  constructor(@Inject(TRIP_NODE) readonly walk: Walk) {}

  ngOnInit() {}
}
