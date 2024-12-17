import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  id?: number;
  movieName: string;
  genre: string;
  rating: string;
  imageUrl: string;
  bannerUrl?: string;
  description?: string;
  duration?: string;
  director?: string;
  featured?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/api'
  private movies: Movie[] = [
    {
      id: 1,
      movieName: 'Inception',
      genre: 'Sci-Fi',
      rating: 'PG-13',
      imageUrl: 'https://picsum.photos/300/400',
      bannerUrl: 'https://picsum.photos/1920/1080',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      duration: '2h 28min',
      director: 'Christopher Nolan',
      featured: true
    },
    {
      id: 2,
      movieName: 'The Dark Knight',
      genre: 'Action',
      rating: 'PG-13',
      imageUrl: 'https://picsum.photos/300/400',
      bannerUrl: 'https://picsum.photos/1920/1080',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      duration: '2h 32min',
      director: 'Christopher Nolan',
      featured: true
    },
    {
      id: 3,
      movieName: 'Pulp Fiction',
      genre: 'Crime',
      rating: 'R',
      imageUrl: 'https://picsum.photos/300/400',
      bannerUrl: 'https://picsum.photos/1920/1080',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      duration: '2h 34min',
      director: 'Quentin Tarantino',
      featured: true
    }
  ];

  addMovie(newMovieData: Movie) {
    return this.http.post(this.baseUrl + '/addMovie', newMovieData);
  }
  getMovies() {
    return this.http.get(this.baseUrl + '/movies');
  }
  getMovieById(id: number) {
    return this.http.get(this.baseUrl + `/getMovieById/${id}`);
  }

  updateMovie(id: number, updatedMovieData: Movie) {
    return this.http.put(this.baseUrl + `/updateMovie/${id}`, updatedMovieData);
  }
  deleteMovie(id: number) {
    return this.http.delete(this.baseUrl + `/deleteMovie/${id}`);
  }

  // getFeaturedMovies(): Observable<Movie[]> {
  //   return of(this.movies.filter(movie => movie.featured));
  // }

  // getMovie(id: number): Observable<Movie | undefined> {
  //   return of(this.movies.find(movie => movie.id === id));
  // }
  getMovieImage() {

    return 'https://picsum.photos/300/400';
  }
}
