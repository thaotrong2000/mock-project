import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from 'src/core/guards/check-login.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [CheckLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
