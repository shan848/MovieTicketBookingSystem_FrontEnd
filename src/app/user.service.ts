import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private currentUser: User | null = null;

  login(email: string, password: string): Observable<User> {
    // Simulate API call
    if (email === 'shan@gmail.com' && password === 'Password123!') {
      this.currentUser = { id: 1, email, name: 'Demo User' };
      return of(this.currentUser);
    };
    return throwError(() => new Error('Invalid credentials'));
  }

  register(email: string, password: string, name: string): Observable<User> {
    // Simulate API call
    if (email && password && name) {
      this.currentUser = { id: 1, email, name };
      return of(this.currentUser);
    }
    return throwError(() => new Error('Registration failed'));
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}
