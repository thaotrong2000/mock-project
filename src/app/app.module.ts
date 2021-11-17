import { ArticleModuleModule } from './../modules/ArticleModule/article-module.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from 'src/core/interceptor/token.interceptor';
import { AuthModule } from 'src/modules/AuthModule/auth.module';
import { HomeModule } from 'src/modules/HomeModule/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModule } from 'src/modules/ProfileModule/profile.module';
import { EditorModule } from 'src/modules/EditorModule/editor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

import { SharedModule } from 'src/modules/SharedModule/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    NgbModule,
    ProfileModule,
    EditorModule,
    ArticleModuleModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    TagInputModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
    AlertModule.forRoot(),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
