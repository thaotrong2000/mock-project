import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  public getTags(): Observable<any> {
    return this.http.get(this.baseUrl + '/tags');
  }
}
