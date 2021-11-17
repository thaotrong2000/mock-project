import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNewsComponent } from './article-news.component';

describe('ArticleNewsComponent', () => {
  let component: ArticleNewsComponent;
  let fixture: ComponentFixture<ArticleNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
