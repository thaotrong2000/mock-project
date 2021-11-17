import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/core/models/article';
import { StoreService } from 'src/core/services/store.service';
import { ArticleService } from 'src/services/ArticleService/article.service';
import { LoginService } from 'src/services/LoginService/login.service';

@Component({
  selector: 'app-editor-article',
  templateUrl: './editor-article.component.html',
  styleUrls: ['./editor-article.component.css'],
})
export class EditorArticleComponent implements OnInit {
  formGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tags: this.fb.array([this.fb.control('')], Validators.required),
  });

  valueOfTags: Array<number | string> = [];

  articles: Article[] = [];

  checkNew: boolean = true;

  userName: any;

  slugOfArticle: any = '';

  inforArticle: any;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loginService.getCurrenUser().subscribe((data) => {
      this.userName = data.user.username;
    });

    this.slugOfArticle = this.route.snapshot.params['article-slug-here'];
    console.log(this.slugOfArticle);
    this.articleService
      .getArticleBySlug(this.slugOfArticle)
      .subscribe((data) => {
        this.inforArticle = data.article;
        console.log(this.inforArticle);
        this.formGroup.get('title')?.patchValue(this.inforArticle.title);
        this.formGroup
          .get('description')
          ?.patchValue(this.inforArticle.description);
        this.formGroup.get('body')?.patchValue(this.inforArticle.body);
        this.tags.clear();
        this.valueOfTags = this.inforArticle.tagList;

        for (const value of this.inforArticle.tagList) {
          this.tags.push(this.fb.control(value));
        }
      });
  }

  get tags(): FormArray {
    return this.formGroup.get('tags') as FormArray;
  }

  /**
   * Khi thêm Tags
   * Created by: THAONT119
   * */
  public addTags($event: any) {
    this.tags.push(this.fb.control($event.value));
    this.valueOfTags.push($event.value);
  }

  /**
   * Khi remove một phần tử
   * Created by: THAONT119
   * */
  removeTags($event: any) {
    console.log('Remove ' + $event);
    var indexRemove = this.tags.value.indexOf($event);
    this.tags.removeAt(indexRemove);
    console.log(this.tags.value);
  }

  /**
   * Khi valid xong - Thêm bài viết lên Database
   * Created by: THAONT119
   * */
  public submitArticle(): void {
    //Kiểm tra Validators
    console.log(this.formGroup.value);

    this.articleService
      .updateArticle(this.slugOfArticle, {
        article: {
          title: this.formGroup.value.title,
          description: this.formGroup.value.description,
          body: this.formGroup.value.body,
          tagList: this.formGroup.value.tags,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.storeService.setCreateArticleSuccess({
            status: true,
            text: 'Successfully updated',
            type: 'info',
          });
          this.router.navigate(['/']);
          this.storeService.setUrlCurrent('/');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  /**
   * Hủy không post nữa - quay trở về localhost:4200/
   * Created by: THAONT119
   * */
  public cancelNewArticle(): void {
    this.router.navigate(['/']);
    this.storeService.setUrlCurrent('/');
  }
}
