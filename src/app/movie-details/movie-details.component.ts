import { Component } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  movie?: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    public authService: UserService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieById(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  bookTickets() {
    if (this.movie) {
      this.router.navigate(['/booking', this.movie.id]);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

}
