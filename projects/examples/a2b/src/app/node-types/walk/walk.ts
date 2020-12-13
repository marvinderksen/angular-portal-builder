import { TripNode } from '../../types';

export interface Walk extends TripNode {
  amount: number;
  unit: string;
  duration: {
    amount: number;
    unit: string;
  };
}
