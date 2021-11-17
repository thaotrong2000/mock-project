import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/core/services/store.service';
import { ArticleService } from 'src/services/ArticleService/article.service';
import { CommentService } from 'src/services/CommentService/comment.service';
import { LoginService } from 'src/services/LoginService/login.service';
import { ProfileService } from 'src/services/ProfileService/profile.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  nameAuthor: string = '';
  srcImage: string = '';
  title: string = '';
  description: string = '';
  body: string = '';
  tag: any = [];
  checkLike: boolean = false;

  slug: string = '';
  checkLogin: boolean = false;
  following: boolean = false;
  favorited: boolean = false;

  userNameCurrent: string = '';
  userCurrent: any;

  showComment: boolean = false;
  onHoverComment: boolean = false;
  valueComment: string = '';

  commentsArr: any[] = [];

  constructor(
    private readonly cmtService: CommentService,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    // Get slug current
    this.slug = this.route.snapshot.params['article-slug-here'];
    this.getAllComment();
    console.log(this.favorited);

    // Get data about infor of article by slug
    this.articleService.getArticleBySlug(this.slug).subscribe((data) => {
      this.favorited = data.article.favorited;
      this.nameAuthor = data.article.author.username;
      this.title = data.article.title;
      this.description = data.article.description;
      this.body = data.article.body;
      this.srcImage = data.article.author.image;
    });

    // Get infor userCurrent
    this.loginService.getCurrenUser().subscribe((data) => {
      this.userCurrent = data.user;
      console.log(this.userCurrent);
      this.userNameCurrent = this.userCurrent.username;
      this.profileService
        .getProfileByUser(this.userCurrent.username)
        .subscribe((data) => {
          if (data) {
            this.checkLogin = true;
          } else {
            this.checkLogin = false;
          }
          this.srcImage = data.profile.image;
        });
    });
  }

  ngAfterViewInit(): void {
    (document.querySelector('.mat-typography') as HTMLElement).style.overflowY =
      'auto';
  }

  public getAllComment() {
    this.cmtService.getCommentFromArticle(this.slug).subscribe((comments) => {
      this.commentsArr = comments.comments;
      console.log(this.commentsArr);
      for (const comment in this.commentsArr) {
        this.profileService
          .getProfileByUser(this.commentsArr[comment].author.username)
          .subscribe((data) => {
            this.commentsArr[comment].srcImg = data.profile.image;
          });
      }
    });
  }

  public onEnterComment(event: any): void {
    console.log('slug', this.slug);
    this.cmtService
      .createComment(this.slug, { comment: { body: event.target.value } })
      .subscribe((comments) => {
        console.log('new cmt', comments);
        this.getAllComment();
        this.valueComment = '';
      });
  }

  public followUsername(): void {
    if (this.following) {
      this.profileService
        .unfollowUsername(this.nameAuthor)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.profileService
        .followUsername(this.nameAuthor)
        .subscribe((data) => console.log(data));
    }

    this.following = !this.following;
  }

  public likeArticle(): void {
    console.log(this.favorited);
    if (this.favorited) {
      this.articleService
        .favoriteArticle(this.slug)
        .subscribe((data) => console.log(data));
    } else {
      this.articleService.unfavoriteArticle(this.slug).subscribe((data) => {
        console.log(data);
      });
    }
  }

  public deleteArticle(): void {
    console.log('deleting');
    this.articleService.deleteArticle(this.slug).subscribe((data) => {
      console.log(data);
      this.storeService.setCreateArticleSuccess({
        status: true,
        text: 'Successfully Deleted',
        type: 'danger',
      });
      this.router.navigate(['']);
    });
  }

  public checkDeleteComment(comment: any): void {
    console.log(comment);
    this.cmtService
      .deleteComment(this.slug, comment._id)
      .subscribe((data) => this.getAllComment());
  }
}
