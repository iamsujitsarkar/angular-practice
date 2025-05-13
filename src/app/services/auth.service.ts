import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Auth } from '../models/auth.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSignal = signal<Auth| undefined>(undefined)
  readonly user = computed<Auth| undefined>(() => this.userSignal())

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  get user$() {
    return this.user
  }

  login(username: string, password: string) {

    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap(res => this.saveToken(res)),
      catchError(err => {
        console.error('Login failed', err);
        return throwError(() => err);
      })
    );
  }

  getAuthUser(): Observable<Auth | undefined> {
    if(this.userSignal()) {
      return of(this.userSignal())
    }
    return this.http.get<Auth | undefined>(`${this.apiUrl}/auth/me`).pipe(
      tap(res => this.userSignal.set(res)),
      catchError(err => throwError(() => err))
    );
  }

  saveToken(res: Auth) {
    localStorage.setItem('auth_token', res.accessToken);
    localStorage.setItem('refresh_token', res.refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
}
