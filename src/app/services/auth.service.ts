import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Replace with your API URL
  private token: string | null | undefined = '';
  isUserAdmin: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          const token = response.token;
          if (token !== null && token !== undefined) {
            this.token = token as string;
            localStorage.setItem('authToken', this.token);
          } else {
            this.token = ''; // Handle the case where token is undefined
          }
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token || null; // return an empty string if token is null
  }
}
