import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getToken(inforLogin: any): Observable<any> {
    return this.http.post(
      'https://mock-project-trongthao.herokuapp.com/api',
      inforLogin
    );
  }
}
