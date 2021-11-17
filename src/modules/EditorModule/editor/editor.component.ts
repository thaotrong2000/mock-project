import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/core/models/article';
import { StoreService } from 'src/core/services/store.service';
import { ArticleService } from 'src/services/ArticleService/article.service';
import { LoginService } from 'src/services/LoginService/login.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  formGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['### Hello, My friend!', Validators.required],
    tags: this.fb.array([this.fb.control('VietNam')], Validators.required),
  });

  valueOfTags: Array<number | string> = [];

  articles: Article[] = [];

  checkNew: boolean = true;

  userName: any;

  imageSrc: string = '';

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loginService.getCurrenUser().subscribe((data) => {
      this.userName = data.user.username;
    });

    console.log(this.router.url);
    this.storeService.setCreateArticleSuccess(false);

    this.loginService.getCurrenUser().subscribe((user) => {
      console.log(user);
      this.imageSrc = user.user.image;
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
    console.log(this.tags.value);
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

    // Sau khi đã validation xong - cho phép tạo bài báo mới
    this.articleService
      .createArticle({
        article: {
          title: this.formGroup.value.title,
          description: this.formGroup.value.description,
          body: this.formGroup.value.body,
          tagList: this.formGroup.value.tags,
        },
      })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/']);
        this.storeService.setUrlCurrent('/');
        this.storeService.setCreateArticleSuccess({
          status: true,
          text: 'Successfully created',
          type: 'success',
        });
      });
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
