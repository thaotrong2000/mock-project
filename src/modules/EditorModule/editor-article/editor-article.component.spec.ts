import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArticleComponent } from './editor-article.component';

describe('EditorArticleComponent', () => {
  let component: EditorArticleComponent;
  let fixture: ComponentFixture<EditorArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
