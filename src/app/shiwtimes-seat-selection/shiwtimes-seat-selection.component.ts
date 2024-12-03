import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { BookingService, Seat, ShowTime } from '../booking.service'


@Component({
  selector: 'app-shiwtimes-seat-selection',
  standalone: true,
  imports: [],
  templateUrl: './shiwtimes-seat-selection.component.html',
  styleUrl: './shiwtimes-seat-selection.component.scss'
})
export class ShiwtimesSeatSelectionComponent {

  movie: any;
  showTimes: ShowTime[] = [];
  seats: Seat[] = [];
  selectedShowTime?: ShowTime;
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieById(movieId).subscribe(movie => {
      this.movie = movie;
      this.loadShowTimes(movieId);
    });
  }

  loadShowTimes(movieId: number) {
    this.bookingService.getShowTimes(movieId).subscribe(times => {
      this.showTimes = times;
    });
  }

  selectShowTime(time: ShowTime) {
    this.selectedShowTime = time;
    this.selectedSeats = [];
    this.bookingService.getSeats(time.id).subscribe(seats => {
      this.seats = seats;
    });
  }

  getRows(): string[] {
    return [...new Set(this.seats.map(seat => seat.row))];
  }

  getSeatsInRow(row: string): Seat[] {
    return this.seats.filter(seat => seat.row === row);
  }

  toggleSeat(seat: Seat) {
    if (seat.status === 'booked') return;

    const index = this.selectedSeats.findIndex(s => s.id === seat.id);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }

  getSeatColor(seat: Seat): string {
    if (seat.status === 'booked') return '#9e9e9e';
    if (this.selectedSeats.some(s => s.id === seat.id)) return 'var(--primary)';
    return '#e0e0e0';
  }

  getSelectedSeatsText(): string {
    return this.selectedSeats
      .map(seat => seat.row + seat.number)
      .join(', ');
  }

  getTotalAmount(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  proceedToPayment() {
    this.router.navigate(['/payment'], {
      state: {
        movieId: this.movie.id,
        showtimeId: this.selectedShowTime?.id,
        seats: this.selectedSeats,
        amount: this.getTotalAmount()
      }
    });
  }
}
