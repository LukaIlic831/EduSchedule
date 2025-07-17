import { SeatDto } from 'src/modules/seats/dto/seat.dto';

export interface ClassroomDto {
  id: number;
  name: string;
  numberOfSeats: number;
  availableSeats: number;
  hasProjector: boolean;
  reservedSeats: SeatDto[];
}
