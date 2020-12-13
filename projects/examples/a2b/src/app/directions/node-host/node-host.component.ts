import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentRegistration, PortalBuilder } from 'angular-portal-builder';

import { CabComponent } from '../../node-types/cab/cab.component';
import { FlightComponent } from '../../node-types/flight/flight.component';
import { NodeComponent } from '../../node-types/node-component';
import { TrainComponent } from '../../node-types/train/train.component';
import { WalkComponent } from '../../node-types/walk/walk.component';
import { TRIP_NODE, TripNode } from '../../types';

const knownComponents: ComponentRegistration[] = [
  {
    componentType: CabComponent,
    matches: (candidate: string) => candidate === 'cab',
  },
  {
    componentType: FlightComponent,
    matches: (candidate: string) => candidate === 'flight',
  },
  {
    componentType: TrainComponent,
    matches: (candidate: string) => candidate === 'train',
  },
  {
    componentType: WalkComponent,
    matches: (candidate: string) => candidate === 'walk',
  },
];

@Component({
  selector: 'app-node-host',
  templateUrl: './node-host.component.html',
  styleUrls: ['./node-host.component.scss'],
})
export class NodeHostComponent implements OnInit {
  @Input()
  node: TripNode | undefined;

  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet: CdkPortalOutlet | undefined;

  private readonly portalBuilder = new PortalBuilder();

  ngOnInit(): void {
    if (!this.node) {
      throw new Error(`No input provided for 'node'.`);
    }
    if (!this.portalOutlet) {
      throw new Error(`Oops, no portal outlet. How did that happen?`);
    }

    const componentRef = this.portalBuilder
      .useRegistry(knownComponents)
      .pick(this.node.type)
      .useInjector([{ provide: TRIP_NODE, useValue: this.node }])
      .attachTo(this.portalOutlet);
    const instance = componentRef.instance;

    // 🡅 inject data or keep the @Input() property 🡇
    // This type check can even be omitted by using PortalBuilder<NodeComponent>
    if (this.instanceOfNodeComponent(instance)) {
      instance.node = this.node;
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  private instanceOfNodeComponent = (
    candidate: any
  ): candidate is NodeComponent => 'node' in candidate;
}
