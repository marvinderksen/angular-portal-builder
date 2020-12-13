import { InjectionToken } from '@angular/core';

export interface Trip {
  from?: string;
  to?: string;
  directions?: TripNode[];
}

export interface TripNode {
  type: string;
  [prop: string]: any;
}

export const TRIP_NODE = new InjectionToken<TripNode>('TripNode');
