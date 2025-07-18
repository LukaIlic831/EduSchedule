import { Injectable } from '@angular/core';
import { APIURL } from '../../../data/data';
import { HttpClient } from '@angular/common/http';
import { createSeatDto } from '../../../state/class/dto/create-seat.dto';
import { Observable } from 'rxjs';
import { Seat } from '../../../state/education-data/models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class ClassInfoService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}

  createSeat(seatForReservation: createSeatDto): Observable<Seat> {
    return this.http.post<Seat>(
      `${this.apiUrl}/seats/create`,
      seatForReservation
    );
  }
}
