import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: LoginCredentials): Observable<User> {
    // Simulate API call - replace with actual API integration
    const mockUser: User = {
      id: 1,
      email: credentials.email,
      name: 'Test User',
      role: 'marketer'
    };
    this.currentUserSubject.next(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return of(mockUser);
  }

  register(data: RegisterData): Observable<User> {
    // Simulate API call - replace with actual API integration
    const mockUser: User = {
      id: 1,
      email: data.email,
      name: data.name,
      role: 'marketer'
    };
    this.currentUserSubject.next(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return of(mockUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}