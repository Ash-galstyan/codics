import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user = '';
  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(firstName: string, lastName: string, email: string, password: string, urlProvided: string) {
    const url = urlProvided ? urlProvided : 'http://localhost:4200/home';
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      url
    };
    return this.http.post('https://cms.gyumri-park.codics.solutions/api/user/register', body);
  }

  login(email: string, password: string) {
    const body = {
      email,
      password
    };
    return this.http.post('https://cms.gyumri-park.codics.solutions/api/user/login', body);
  }

  logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    this.user = null;
    const token = currentUser.token;
    const body = { token: '' };
    return this.http.post('https://cms.gyumri-park.codics.solutions/api/user/logout', body, {
      headers: new HttpHeaders().set('Authorization', token)
    }).subscribe(res => {
      this.loggedIn = false;
      this.router.navigate(['home']);
    });
  }

  forgotPassword(email: string, urlProvided: string) {
    const url = urlProvided ? urlProvided : 'http://localhost:4200/reset-password';
    const body = {
      email,
      url
    };
    return this.http.post('https://cms.gyumri-park.codics.solutions/api/user/forgot-password', body);
  }

  resetPassword(password: string, token: string) {
    const body = {
      token,
      password
    };
    return this.http.put('https://cms.gyumri-park.codics.solutions/api/user/reset-password', body);
  }

  verifyEmail(token: string) {
    const body = {
      token
    };
    return this.http.post('https://cms.gyumri-park.codics.solutions/api/user/verify-email', body);
  }
}
