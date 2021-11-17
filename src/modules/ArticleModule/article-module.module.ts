import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArticleModuleRoutingModule } from './article-module-routing.module';
import { SharedModule } from '../SharedModule/shared.module';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleModuleRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class ArticleModuleModule {}
