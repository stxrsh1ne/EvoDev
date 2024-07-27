import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {UserListComponent} from './user-list/user-list.component';
import {AccessRoleGuard} from './access-role.guard';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    canActivate: [AccessRoleGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
