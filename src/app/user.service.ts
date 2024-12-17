import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  age: number;
  mobileNo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
    const userData = (localStorage.getItem('loggedIn'));
    this.currentUser = userData ? JSON.parse(userData) : null;
  }
  public currentUser: any = null;
  private baseUrl = 'http://localhost:8080/api'
  login(email: string, password: string) {
    // Simulate API call
    return this.http.post(this.baseUrl + '/login', { email, password })
    // if (email === 'shan@gmail.com' && password === 'Password123!') {
    //   this.currentUser = { id: 1, email, name: 'Demo User',age:24,mobileNo:'8798780' };
    //   return of(this.currentUser);
    // };
    return throwError(() => new Error('Invalid credentials'));
  }

  register(email: string, password: string, name: string, age: number, mobileNo: string) {
    // Simulate API call
    // if (email && password && name & age & mobileNo) {
    //   this.currentUser = { id: 1, email, name };
    //   return of(this.currentUser);
    // }
    return this.http.post(this.baseUrl + '/registerUser', { email, password, name, age, mobileNo })

    return throwError(() => new Error('Registration failed'));
  }

  isLoggedIn() {
    const userData = (localStorage.getItem('loggedIn'));
    this.currentUser = userData ? JSON.parse(userData) : null;
    return this.currentUser;
  }

  logout(): void {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['/'])

  }

  bookings(id: any) {
    return this.http.get(this.baseUrl + `/user-bookings/${id}`);
  }
}
