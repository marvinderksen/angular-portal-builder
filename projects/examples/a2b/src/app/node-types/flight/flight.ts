import { TripNode } from '../../types';

export interface Flight extends TripNode {
  departure: {
    airport: string;
    gate: string;
    date: string;
  };
  arrival: {
    airport: string;
    gate: string;
    date: string;
  };
  checkinUrl: string;
}
