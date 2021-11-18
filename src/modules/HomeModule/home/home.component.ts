import { Article } from 'src/core/models/article';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ArticleService } from 'src/services/ArticleService/article.service';

import { StoreService } from 'src/core/services/store.service';
import { HomeService } from 'src/services/HomeService/home.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/LoginService/login.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  @ViewChild('mainScreen') elementView: ElementRef = new ElementRef('demo');
  @ViewChild('someVar') el: ElementRef = new ElementRef('demo1');
  @ViewChild('demo') elDemo: ElementRef = new ElementRef('demo2');

  viewHeight: number = 0;

  tags: Array<any> = [];

  articlesArray: any = [];

  limit: number = 10;

  offset: number = 0;

  array: any = [];

  Articles: Array<Article> = new Array<Article>();

  checkLogin: boolean = false;

  checkStatusFeed: any = false;

  checkTabActive: number = 0;

  checkClickNew: boolean = false;

  checkContent: number = 1;

  userCurrent: any;

  checkClickTag: boolean = false;

  checkCreatedSuccess: boolean = false;

  listTagSearch: Array<string> = [];

  checkTagCurrent: boolean = false;

  displaySelectedTag: boolean = false;

  dataSeletectag: string = '';

  checkTag: BehaviorSubject<any> = new BehaviorSubject(false);

  tagSelected: BehaviorSubject<string> = new BehaviorSubject('');

  articlesBehavior: Subject<any> = new Subject();

  modalRef: BsModalRef = new BsModalRef();

  textMsg: string = '';

  typeMsg: string = '';

  constructor(
    private readonly articleService: ArticleService,
    private storeService: StoreService,
    private homeService: HomeService,
    private router: Router,
    private loginService: LoginService,
    private modalService: BsModalService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkStatusLogin();
    this.getListTags();
    this.storeService.getTokenCurrent().subscribe((data) => {
      if (data) {
        this.checkLogin = true;
      }
    });

    this.tagSelected.subscribe((data) => {
      if (data) {
        console.log('Ban co 1 thong bao ' + data);
        this.displaySelectedTag = true;
        this.checkClickTag = true;
        this.dataSeletectag = data;

        this.Articles = [];
        this.articleService
          .getArticleByTag(this.dataSeletectag, this.limit, this.offset)
          .subscribe((data) => {
            this.Articles = data.articles;
            console.log(data);
          });
      } else {
        this.displaySelectedTag = false;
      }
    });

    this.loginService.getCurrenUser().subscribe((data) => {
      this.userCurrent = data.user;
    });

    this.checkTag.subscribe((data) => {});

    this.storeService.getTokenCurrent().subscribe((data) => {
      if (data) {
        this.checkLogin = true;
      } else {
        this.checkLogin = false;
      }
    });

    this.whenStatusGlobal();

    this.storeService.setUrlCurrent(this.router.url);

    this.storeService.getUrlCurrent().subscribe((data) => {
      if (data == '/') {
        this.checkClickNew = false;
      } else {
        this.checkClickNew = true;
      }

      this.getListTags();
      if (!this.checkStatusFeed) {
        this.whenStatusGlobal();
      }
    });

    // Fix conflict follow:
    this.articlesBehavior.subscribe((data) => {
      console.log('kiem tra su thay doi cua du lieu');
      console.log(data);
      this.Articles.map((article) => {
        if (article.author.username == data.user) {
          article.author.following = data.statusFollow;
          console.log('thay doi thanh cong');
        }
      });
    });

    this.storeService.getCreateArticleSuccess().subscribe((data) => {
      this.checkCreatedSuccess = data.status;
      this.textMsg = data.text;
      this.typeMsg = data.type;
    });
  }

  /**
   * Sử dụng Scroll trong Angular
   * Created by: THAONT119
   * */
  ngAfterViewInit(): void {
    this?.el?.nativeElement.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.storeService.setCreateArticleSuccess({ status: false, text: '' });
  }

  /**
   * Khi chọn trạng thái là Global
   * Created by: THAONT119
   * */
  public whenStatusGlobal(): void {
    this.listTagSearch = [];
    this.checkTag.next(false);
    this.displaySelectedTag = false;
    // Tự động lấy 10 bài viết Global khi chưa Login
    this.Articles = [];
    this.articleService
      .getArticleLimitAndOffset(this.limit, this.offset)
      .subscribe((articles) => {
        this.Articles = articles?.articles;
      });

    this.checkStatusFeed = false;
  }

  /**
   * Khi trạng thái là Feed
   * Created by: THAONT119
   * */
  public whenStatusFeed(): void {
    this.listTagSearch = [];
    this.displaySelectedTag = false;
    this.limit = 10;
    this.offset = 0;
    this.checkTag.next(false);
    this.Articles = [];
    this.checkStatusFeed = true;
    // Lấy bài viết của những người đang theo dõi
    this.getFeedArticles();
  }

  /**
   * Lấy toàn bộ bài viết - của những người mình đang follow
   * Created by: THAONT119
   * */
  public getFeedArticles(): void {
    this.articleService
      .getArticleFeedByLimitAndOffset(this.limit, this.offset)
      .subscribe((data) => {
        this.Articles = data.articles;
      });
  }

  /**
   * Xử lý sự kiện: Load thêm dữ liệu khi kéo đến cuối trang
   * Created by: THAONT119
   * */
  public onScroll() {
    // Cộng thêm 56 - vì 56 là chiều cao cố định của Navbar
    if (
      window.innerHeight ==
      this.elDemo.nativeElement.getBoundingClientRect().top
    ) {
      // Mỗi khi kéo xuống vị trị BOTTOM(cuối cùng của trang web)
      // Sẽ gọi thêm dữ liệu để đưa vào trang web
      this.offset += 10;

      // Nếu là trạng thái: Global
      if (this.checkStatusFeed == false && this.checkClickTag == false) {
        this.articleService
          .getArticleLimitAndOffset(this.limit, this.offset)
          .subscribe((articles) => {
            // Nếu có dữ liệu trả về - thì add nó vào Articles
            // để cập nhật cho người dùng
            if (articles.articles?.length) {
              console.log(articles.articles);
              for (const article of articles.articles) {
                this.Articles.push(article);
              }
            }
          });
      }
      // Nếu là trạng thái: Feed
      if (this.checkStatusFeed == true && this.checkClickTag == false) {
        this.articleService
          .getArticleFeedByLimitAndOffset(this.limit, this.offset)
          .subscribe((articles) => {
            // Nếu có dữ liệu trả về - thì add nó vào Articles
            // để cập nhật cho người dùng
            if (articles.articles?.length) {
              console.log(articles.articles);
              for (const article of articles.articles) {
                this.Articles.push(article);
              }
            }
          });
      }

      // Nếu là trạng thái tìm kiếm
      if (this.checkClickTag) {
        // Nếu là trạng thái tìm nhiều: ở bên phải
        if (this.listTagSearch.length) {
          for (const tag of this.listTagSearch) {
            this.articleService
              .getArticleByTag(tag, this.limit, this.offset)
              .subscribe((data) => {
                console.log(data);
                // Nếu trước đó đã có tag được chọn, thì ta sẽ add thêm vào dữ liệu Articles sẵn có:
                for (const article of data.articles) {
                  this.Articles.push(article);
                }
                // Biến đảm bảo rằng có một thẻ Tags đang được chọn
                this.checkClickTag = true;
              });
          }
        }
        // Nếu là trạng thái tìm kiếm theo Hashtag
        else {
          this.articleService
            .getArticleByTag(this.dataSeletectag, this.limit, this.offset)
            .subscribe((data) => {
              for (const article of data.articles) {
                this.Articles.push(article);
              }
            });
        }
      }
    }
  }

  /**
   * Kiểm tra trạng thái Login
   * checkLogin: True - đã login, False - chưa login
   * Created by: THAONT119
   * */
  public checkStatusLogin(): void {
    if (this.storeService.getToken()) {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
  }

  /**
   * Lấy toàn bộ Tags
   * Created by: THAONT119
   * */
  public getListTags(): void {
    this.homeService.getTags().subscribe((data) => {
      this.tags = data.tags;
    });
  }

  /**
   * Khi click vào New Article
   * Created by: THAONT119
   *
   **/
  public checkDemo($event: any): void {
    this.checkClickNew = $event;
  }

  /**
   * Xem chi tiết một bài viết
   * Created by: THAONT119
   * */
  public seeDetails($event: any): void {
    console.log($event);
    this.checkClickNew = true;
  }

  /**
   * Khi click vào một Tags bất kì, sẽ lấy dữ liệu và xử lý một số biến
   * Created by: THAONT119
   * */
  public clickTag(tagName: string): void {
    this.limit = 10;
    this.offset = 0;
    console.log(tagName);
    if (this.listTagSearch.indexOf(tagName) < 0) {
      this.listTagSearch.push(tagName);
    } else {
      this.listTagSearch.splice(this.listTagSearch.indexOf(tagName), 1);
    }
    console.log(this.listTagSearch);

    this.Articles = [];
    if (this.listTagSearch.length == 0) {
      this.whenStatusGlobal();
      this.checkClickTag = false;
    }

    for (const tag of this.listTagSearch) {
      this.articleService
        .getArticleByTag(tag, this.limit, this.offset)
        .subscribe((data) => {
          console.log(data);
          // Nếu trước đó đã có tag được chọn, thì ta sẽ add thêm vào dữ liệu Articles sẵn có:
          for (const article of data.articles) {
            this.Articles.unshift(article);
          }
          // Biến đảm bảo rằng có một thẻ Tags đang được chọn
          this.checkClickTag = true;
        });
    }
  }

  public moveTop(): void {
    this.el.nativeElement.scrollTop = 0;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public clickToLogin(): void {
    this.modalRef.hide();
    this.router.navigate(['/login']);
  }
}
