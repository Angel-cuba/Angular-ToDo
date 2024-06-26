import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedUserId: string = '';
  public isLoggedIn: boolean = false;
  public userToken: string = '';

  public url: string = environment.localUrl;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.loggedUserId = this.auth.getUserId();
    this.userToken = this.auth.getToken();
  }

  loadUser() {
    const headers = {
      Authorization: 'Bearer ' + this.userToken,
      'Content-Type': 'application/json',
    };
    return this.http.get(this.url + 'users/user/' + this.loggedUserId, {
      headers: headers,
    });
  }
}
