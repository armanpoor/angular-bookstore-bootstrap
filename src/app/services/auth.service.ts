import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private isAdmin = false;

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<boolean> {
    this.isLoggedIn = username === 'admin' && password === 'admin';
    this.isAdmin = this.isLoggedIn;
    return of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  get isUserAdmin(): boolean {
    return this.isAdmin;
  }
}
