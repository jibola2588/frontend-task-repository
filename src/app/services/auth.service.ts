import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Your API endpoint here

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/signup`, user, { headers, withCredentials: true });
  }

  loginUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/login`, user, { headers, withCredentials: true });
  }

  logoutUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`, {
      withCredentials: true
    });
  }
}
