import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  createComment(slug: any, comment: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   })
    // }
    return this.http.post(this.baseUrl + `/articles/${slug}/comments`, comment);
  }

  getCommentFromArticle(slug: any): Observable<any> {
    return this.http.get(this.baseUrl + `/articles/${slug}/comments`);
  }

  deleteComment(slug: any, commentId: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + `/articles/${slug}/comments/${commentId}`
    );
  }
}
