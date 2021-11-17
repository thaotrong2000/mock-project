import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private renderer!: Renderer2;
  private colorTheme!: any;
  public urlCurrent: string = '';
  public tokenBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(
    localStorage.getItem('token')
  );
  public behaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.urlCurrent
  );

  public createArticleSuccess: BehaviorSubject<any> = new BehaviorSubject<any>({
    status: false,
    text: '',
    type: 'success',
  });

  public checkFollowChange: BehaviorSubject<any> = new BehaviorSubject<any>({
    user: '',
    statusFollow: false,
  });

  tokenAuth: string | null = 'demo';
  constructor(rendererFactory: RendererFactory2) {
    this.tokenAuth = localStorage.getItem('token');
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public getToken(): string {
    return this.tokenAuth || '';
  }

  public setToken(valueToken: string): void {
    this.tokenAuth = valueToken;
  }

  public getUrlCurrent(): BehaviorSubject<any> {
    return this.behaviorSubject;
  }

  public setUrlCurrent(value: any): void {
    this.behaviorSubject.next(value);
  }

  public getCheckFollow(): BehaviorSubject<any> {
    return this.checkFollowChange;
  }

  public setCheckFollow(value: any): void {
    this.checkFollowChange.next(value);
  }

  public getCreateArticleSuccess(): BehaviorSubject<any> {
    return this.createArticleSuccess;
  }

  public setCreateArticleSuccess(value: any): void {
    this.createArticleSuccess.next(value);
  }

  public getTokenCurrent(): BehaviorSubject<any> {
    return this.tokenBehavior;
  }

  public setTokenCurrent(value: any): void {
    this.tokenBehavior.next(value);
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  update(theme: 'dark-mode' | 'light-mode') {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark-mode';
  }

  private setColorTheme(theme: any) {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme');
    } else {
      this.colorTheme = 'light-mode';
    }
  }
}
