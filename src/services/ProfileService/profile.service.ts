import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getProfileByUser(username: any): Observable<any> {
    return this.http.get(this.baseUrl + `/profiles/${username}`);
  }

  // call api follow ???

  public followUsername(username: string): Observable<any> {
    return this.http.post(this.baseUrl + `/profiles/${username}/follow`, {});
  }

  public unfollowUsername(username: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/profiles/${username}/follow`, {});
  }
}
