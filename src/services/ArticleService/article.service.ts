import { Article } from 'src/core/models/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseUrl = 'https://mock-project-trongthao.herokuapp.com/api';

  articlesList: any = {};

  constructor(private readonly http: HttpClient) {}

  //List Article Service

  getListArticles(): Observable<any> {
    return this.http.get(this.baseUrl + '/articles');
  }

  getArticleByAuthor(
    username: any,
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl +
        `/articles?author=${username}&&limit=${limit}&&offset=${offset}`
    );
  }

  getArticleByTag(tag: any, limit: any, offset: any): Observable<any> {
    return this.http.get(
      this.baseUrl + `/articles?tag=${tag}&&limit=${limit}&&offset=${offset}`
    );
  }

  getArticleFavoriteByUsername(
    username: any,
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl +
        `/articles?favorited=${username}&&limit=${limit}&&offset=${offset}`
    );
  }

  getArticleLimitAndOffset(limit: number, offset: number): Observable<any> {
    return this.http.get<Article[]>(
      this.baseUrl + `/articles?limit=${limit}&&offset=${offset}`
    );
  }

  //Article Feed Service

  getArticleFeed(): Observable<any> {
    return this.http.get(this.baseUrl + '/articles/feed');
  }

  getArticleFeedByLimitAndOffset(
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl + `/articles/feed?limit=${limit}&&offset=${offset}`
    );
  }

  getArticleBySlug(article: any): Observable<any> {
    return this.http.get(this.baseUrl + `/articles/${article}`);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post(this.baseUrl + '/articles', article);
  }

  updateArticle(articlesLug: any, article: any): Observable<any> {
    return this.http.put(this.baseUrl + `/articles/${articlesLug}`, article);
  }

  deleteArticle(slug: any): Observable<any> {
    return this.http.delete(this.baseUrl + `/articles/${slug}`);
  }

  favoriteArticle(slug: any): Observable<any> {
    return this.http.post(this.baseUrl + `/articles/${slug}/favorite`, {});
  }

  unfavoriteArticle(slug: any): Observable<any> {
    return this.http.delete(this.baseUrl + `/articles/${slug}/favorite`, {});
  }
}
