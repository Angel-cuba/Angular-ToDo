import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse, User, newUser } from '../../interfaces/User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.localUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<LoginResponse> {   
    return this.http.post<LoginResponse>(this.url + 'users/signin',user);
  }

  register(user: newUser) {
    return this.http.post(this.url + 'users/create', user);
  }

  checkAuth() {
   const token = localStorage.getItem('token');
   if(!token) {
      this.router.navigate(['/hero']);
      return false;
   }
    return true;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/hero/home']);
  }
}
