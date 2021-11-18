import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { StoreService } from 'src/core/services/store.service';
import { ArticleService } from 'src/services/ArticleService/article.service';
import { CommentService } from 'src/services/CommentService/comment.service';
import { ProfileService } from 'src/services/ProfileService/profile.service';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html',
  styleUrls: ['./article-home.component.css'],
})
export class ArticleHomeComponent implements OnInit {
  @Input() article: any = [];

  @Input() checkLogin: boolean = false;
  @Input() userNameCurrent: string = '';
  @Input() tagSelected: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() articlesBehavior: Subject<any> = new Subject<any>();
  @Input() checkFollowChange: Subject<any> = new Subject<any>();

  @Input() imgCurrent: string = '';

  @Output() seeDetails: EventEmitter<any> = new EventEmitter();
  @Output() loginToFollow: EventEmitter<any> = new EventEmitter();

  showComment: boolean = false;
  onHoverComment: boolean = false;
  valueComment: string = '';
  customBody: string = '';

  commentsArr: any[] = [];
  checkReadLong: boolean = false;
  checkReadMore: boolean = true;

  constructor(
    private readonly http: HttpClient,
    private readonly cmtService: CommentService,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllComment();

    if (this.article.body.length > 50) {
      this.checkReadLong = true;
      this.customBody = this.article.body.slice(0, 50);
    } else {
      this.checkReadLong = false;
      this.customBody = this.article.body;
    }
    console.log();
  }

  /**
   * When click comment - get all comment
   * */
  public whenClickComment(): void {
    this.getAllComment();
  }

  /**
   * Get all comment of this article
   * */
  public getAllComment() {
    this.cmtService
      .getCommentFromArticle(this.article.slug)
      .subscribe((comments) => {
        this.commentsArr = comments.comments;
        for (const comment in this.commentsArr) {
          this.profileService
            .getProfileByUser(this.commentsArr[comment].author.username)
            .subscribe((data) => {
              this.commentsArr[comment].srcImg = data.profile.image;
            });
        }
      });
  }

  /**
   * When click enter - this comment will sent
   * */
  public onEnterComment(event: any): void {
    console.log('slug', this.article.slug);

    this.cmtService
      .createComment(this.article.slug, {
        comment: { body: event.target.value },
      })
      .subscribe((comments) => {
        console.log('new cmt', comments);
        this.getAllComment();
        this.valueComment = '';
      });
  }

  public clickSeeDeatils() {
    this.seeDetails.emit('Ban da chon che do xem');
  }

  deleteComment(comment: any) {
    this.cmtService
      .deleteComment(this.article.slug, comment)
      .subscribe((data) => {
        this.getAllComment();
      });
  }

  public followUsername(): void {
    if (this.checkLogin) {
      if (this.article.author.following) {
        this.profileService
          .unfollowUsername(this.article.author.username)
          .subscribe((data) => {
            console.log(data);
          });
      } else {
        this.profileService
          .followUsername(this.article.author.username)
          .subscribe((data) => console.log(data));
      }

      this.article.author.following = !this.article.author.following;
      this.articlesBehavior.next({
        user: this.article.author.username,
        statusFollow: this.article.author.following,
      });

      this.storeService.setCheckFollow({
        user: this.article.author.username,
        statusFollow: this.article.author.following,
      });
    } else {
      console.log('ban chua login');
      this.loginToFollow.emit();
    }
  }

  public likeArticle(): void {
    if (this.checkLogin) {
      this.article.favorited = !this.article.favorited;
      if (this.article.favorited) {
        this.article.favoritesCount++;
        this.articleService
          .favoriteArticle(this.article.slug)
          .subscribe((data) => console.log(data));
      } else {
        this.article.favoritesCount--;

        this.articleService
          .unfavoriteArticle(this.article.slug)
          .subscribe((data) => {
            console.log(data);
          });
      }
    }
  }

  public selectedTag(tag: any): void {
    this.tagSelected.next(tag);
  }

  public checkDeleteComment(comment: any) {
    console.log(comment);
    this.cmtService
      .deleteComment(this.article.slug, comment._id)
      .subscribe((data) => this.getAllComment());
  }

  public linkToArticleSlug(slug: any) {
    this.router.navigate(['article/', slug]);
  }
}
