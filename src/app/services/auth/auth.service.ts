import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, newUser } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UserInLocalStorage } from './session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.localUrl;

  isAuthenticated: BehaviorSubject<UserInLocalStorage> =
    new BehaviorSubject<UserInLocalStorage>(new UserInLocalStorage());

  constructor(private http: HttpClient, private router: Router) {
    this.verifyAuthentication();
  }

  login(user: User): Observable<UserInLocalStorage> {
    return this.http.post<UserInLocalStorage>(this.url + 'users/signin', user);
  }

  register(user: newUser): Observable<UserInLocalStorage> {
    return this.http.post<UserInLocalStorage>(this.url + 'users/create', user);
  }

  verifyAuthentication() {
    const isActive = localStorage.getItem('session');
    if (isActive) {
      let userData: UserInLocalStorage = JSON.parse(isActive);
      userData.isLoggedIn = true;
      this.refreshSession(userData);
    }
  }

  refreshSession(response: UserInLocalStorage) {
    this.isAuthenticated.next(response);
  }

  getSessionStatus() {
    return this.isAuthenticated.asObservable();
  }

  saveSession(response: UserInLocalStorage): boolean {
    const token = localStorage.getItem('session');
    if (token) {
      return false;
    }
    let user = JSON.stringify(response);
    localStorage.setItem('session', user);
    return true;
  }

  getToken(): string {
    let userSession = localStorage.getItem('session');
    if (userSession) {
      let result = JSON.parse(userSession);
      return result.data.token;
    }
    return '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/hero/home']);
  }
}
