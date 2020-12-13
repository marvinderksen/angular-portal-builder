import { Component, Input, OnInit } from '@angular/core';

import { TripNode } from '../../types';
import { NodeComponent } from '../node-component';
import { Train } from './train';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
})
export class TrainComponent implements NodeComponent, OnInit {
  @Input()
  node: TripNode | undefined = undefined;

  train: Train | undefined;

  constructor() {}

  ngOnInit() {
    this.train = this.node as Train;
  }
}
