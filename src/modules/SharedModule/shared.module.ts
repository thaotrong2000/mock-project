import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/core/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleHomeComponent } from 'src/core/components/article-home/article-home.component';
import { MarkdownModule } from 'ngx-markdown';
import { ReadMoreComponent } from 'src/core/components/read-more/read-more.component';
import { TimePipePipe } from 'src/core/pipes/time-pipe.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ArticleHomeComponent,
    ReadMoreComponent,
    TimePipePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    MarkdownModule,
    FormsModule,
  ],
  exports: [
    NavbarComponent,
    NgbModule,
    ReactiveFormsModule,
    ArticleHomeComponent,
    MarkdownModule,
    ReadMoreComponent,
  ],
})
export class SharedModule {}
