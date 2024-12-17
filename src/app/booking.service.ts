import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'selected' | 'booked';
}

export interface ShowTime {
  id: number;
  time: string;
  date: string;
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  generateSeats(): Seat[] {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          price: row < 'D' ? 150 : 100,
          status: Math.random() > 0.8 ? 'booked' : 'available'
        });
      }
    });

    return seats;
  }

  getShowTimes(movieId: number): Observable<ShowTime[]> {
    const times = [
      { id: 1, time: '10:00 AM', date: '2024-01-20' },
      { id: 2, time: '2:30 PM', date: '2024-01-20' },
      { id: 3, time: '6:00 PM', date: '2024-01-20' },
      { id: 4, time: '9:30 PM', date: '2024-01-20' }
    ];
    return of(times);
  }

  getSeats(showtimeId: number): Observable<Seat[]> {
    return of(this.generateSeats());
  }
}