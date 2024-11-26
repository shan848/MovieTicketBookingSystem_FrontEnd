import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  age:number;
  mobileNo:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private currentUser: User | null = null;
private baseUrl='http://localhost:8080/api'
  login(email: string, password: string): Observable<User> {
    // Simulate API call
    this.http.post(this.baseUrl+'/login',{email,password}).subscribe(
      (response:any) => {
        console.log('Data:', response);
        this.currentUser = response.user;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    // if (email === 'shan@gmail.com' && password === 'Password123!') {
    //   this.currentUser = { id: 1, email, name: 'Demo User',age:24,mobileNo:'8798780' };
    //   return of(this.currentUser);
    // };
    return throwError(() => new Error('Invalid credentials'));
  }

  register(email: string, password: string, name: string,age:number,mobileNo:string): Observable<User> {
    // Simulate API call
    // if (email && password && name & age & mobileNo) {
    //   this.currentUser = { id: 1, email, name };
    //   return of(this.currentUser);
    // }
    this.http.post(this.baseUrl+'/registerUser',{email, password, name,age,mobileNo}).subscribe(
      (response:any) => {
        console.log('Data:', response);
        this.currentUser = response.user;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    return throwError(() => new Error('Registration failed'));
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}
