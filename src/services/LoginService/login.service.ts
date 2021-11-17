import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logedIn: boolean = false;

  token: string = '';

  user: any = {};

  baseUrl = 'http://localhost:3000/api';

  check: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private router: Router) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/users', user);
  }

  loginWithAuth(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/users/login', user);
  }

  logInSuccess(user: any) {
    this.logedIn = true;
    this.user = user;
    this.token = user.token;
  }

  getCurrenUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/user');
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(this.baseUrl + '/user', user);
  }

  getCheckRouterLogin(): Observable<any> {
    return this.check;
  }

  setCheckRouterLogin(value: boolean): void {
    this.check.next(value);
  }
}
