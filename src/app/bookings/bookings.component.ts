import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  public bookings: any;
  constructor(private router: Router, public bookingService: UserService) {
  }

  ngOnInit() {
    this.getAllBookings()
  }

  getAllBookings() {
    this.bookingService.bookings(this.bookingService.currentUser.id).subscribe((res: any) => {
      res.forEach((e: any) => {
        const randomParam = Math.floor(Math.random() * 1000000);  // Random number to ensure unique URL
        // Construct the API URL with the random query parameter
        const apiUrl = `https://picsum.photos/300/400?random=${randomParam}`;
        // Update the image source with the new URL
        e.imageUrl = apiUrl;
      });
      this.bookings = res;
    });
  }
}
