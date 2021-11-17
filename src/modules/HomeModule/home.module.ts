import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleNewsComponent } from 'src/core/components/article-news/article-news.component';
import { ArticleTagsComponent } from 'src/core/components/article-tags/article-tags.component';
import { SharedModule } from '../SharedModule/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [HomeComponent, ArticleNewsComponent, ArticleTagsComponent],

  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MarkdownModule.forChild(),
    AlertModule,
    ModalModule,
  ],
  providers: [BsModalService],
})
export class HomeModule {}
