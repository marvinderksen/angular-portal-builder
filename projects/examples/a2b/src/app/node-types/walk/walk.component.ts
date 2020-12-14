import { Component, Input, OnInit } from '@angular/core';

import { TripNode } from '../../types';
import { Walk } from './walk';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.scss'],
})
export class WalkComponent implements OnInit {
  @Input()
  node: TripNode | undefined = undefined;

  walk: Walk | undefined;

  ngOnInit() {
    this.walk = this.node as Walk;
  }
}
