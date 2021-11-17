import { EditorArticleComponent } from './../EditorModule/editor-article/editor-article.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from '../EditorModule/editor/editor.component';
import { HomeComponent } from './home/home.component';
import { CheckLoginGuard } from 'src/core/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'editor/:article-slug-here',
        component: EditorArticleComponent,
        canActivate: [CheckLoginGuard],
      },
      {
        path: 'editor',
        component: EditorComponent,
        canActivate: [CheckLoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
