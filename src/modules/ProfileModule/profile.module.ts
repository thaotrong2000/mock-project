import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../SharedModule/shared.module';
import { ArticleHomeComponent } from 'src/core/components/article-home/article-home.component';
import { HomeModule } from '../HomeModule/home.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    HomeModule,
    ReactiveFormsModule,
  ],
  exports: [SharedModule],
})
export class ProfileModule {}
