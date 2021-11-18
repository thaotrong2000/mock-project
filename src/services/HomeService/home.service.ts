import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'https://mock-project-trongthao.herokuapp.com/api';

  constructor(private readonly http: HttpClient) {}

  public getTags(): Observable<any> {
    return this.http.get(this.baseUrl + '/tags');
  }
}
