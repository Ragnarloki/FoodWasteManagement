import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  // Reactive login status tracker
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Store token and role in localStorage
  storeToken(token: string, role: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role); // Save role
    this.isLoggedInSubject.next(true); // Notify subscribers
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  // Get user role
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Set user role manually (optional)
  setRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); // Remove role as well
    this.isLoggedInSubject.next(false); // Notify subscribers
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
