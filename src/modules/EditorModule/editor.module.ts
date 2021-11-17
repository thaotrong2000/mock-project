import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor/editor.component';
import { EditorArticleComponent } from './editor-article/editor-article.component';
import { SharedModule } from '../SharedModule/shared.module';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

@NgModule({
  declarations: [EditorArticleComponent, EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    TagInputModule,
    FormsModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot(),
  ],
})
export class EditorModule {}
