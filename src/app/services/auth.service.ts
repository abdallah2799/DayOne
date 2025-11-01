import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User, LoginCredentials } from '../Models/user';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_USER_KEY = 'authenticated_user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private mockDataService: MockDataService) {
    const storedUser = localStorage.getItem(this.AUTH_USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  get isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.mockDataService.getUserByEmail(credentials.email).pipe(
      map(user => {
        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        // Store user in localStorage
        localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        return user;
      })
    );
  }

  register(userData: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    return this.mockDataService.createUser(userData);
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_USER_KEY);
    this.currentUserSubject.next(null);
  }

  updateCurrentUser(updates: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    return this.mockDataService.updateUser(currentUser.id, updates).pipe(
      map(updatedUser => {
        localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
        return updatedUser;
      })
    );
  }

  // Check if email is already taken
  checkEmailExists(email: string): Observable<boolean> {
    return this.mockDataService.getUserByEmail(email).pipe(
      map(user => !!user)
    );
  }
}
