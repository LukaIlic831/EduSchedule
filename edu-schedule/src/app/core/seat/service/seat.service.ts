import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat } from '../../../state/education-data/models/seat.model';
import { createSeatDto } from '../../../dto/seat/create-seat.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createSeat(seatForReservation: createSeatDto): Observable<Seat> {
    return this.http.post<Seat>(
      `${this.apiUrl}/seats/create`,
      seatForReservation
    );
  }

  deleteReservedSeats(reservedSeatsIds: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/seats/delete`, {
      body: reservedSeatsIds,
    });
  }
}
