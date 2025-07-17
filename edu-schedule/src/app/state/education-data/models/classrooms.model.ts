import { Seat } from './seat.model';

export interface Classroom {
  id: number;
  name: string;
  numberOfSeats: number;
  hasProjector: boolean;
  reservedSeats?: Seat[];
}
