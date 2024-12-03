import { Component } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent {
  movies: any = [];

  constructor(private movieService: MovieService, public router: Router) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe((res: any) => {
      console.log(res, "===");
      if (res.message) {
        alert("Movie Deleted Successfully");
        this.getAllMovies();
      } else {
        alert('Something went wrong.Try again!!')
      }
    });
  }
}
