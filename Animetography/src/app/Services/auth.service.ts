import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface ServerResponse {
  success: boolean;
  msg: string;
  user: any;
  token: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  public baseUri: string = 'https://animetography-blog.com/api/users';
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public registerUser(user): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseUri + '/register', user, {
      headers: this.headers,
    });
  }

  public authenticateUser(user): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(
      this.baseUri + '/authenticate',
      user,
      { headers: this.headers }
    );
  }

  public getProfile(): Observable<ServerResponse> {
    this.loadToken();
    const head = this.headers.append('Authorization', this.authToken);
    return this.http.get<ServerResponse>(this.baseUri + '/profile', {
      headers: head,
    });
  }

  public storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return false;
  }

  public loggedin() {
    if (localStorage.id_token == undefined) {
      return false;
    } else {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
