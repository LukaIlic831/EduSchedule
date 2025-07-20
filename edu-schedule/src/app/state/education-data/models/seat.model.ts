export interface Seat {
  id: number;
  studentIndex: number;
  numberOfSeat: number;
  status?: 'selected' | 'reserved' | 'available';
}
