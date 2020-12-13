import { Component, Input, OnInit } from '@angular/core';

import { TripNode } from '../../types';
import { NodeComponent } from '../node-component';
import { Cab } from './cab';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrls: ['./cab.component.scss'],
})
export class CabComponent implements NodeComponent, OnInit {
  @Input()
  node: TripNode | undefined = undefined;

  cab: Cab | undefined;

  constructor() {}

  ngOnInit() {
    this.cab = this.node as Cab;
  }
}
