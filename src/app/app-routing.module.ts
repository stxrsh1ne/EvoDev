import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PreFetchingResolver } from './pre-fetching.resolver';

const routes: Routes = [
  {
    path: 'post-detail',
    component: PostDetailComponent,
    resolve: { post: PreFetchingResolver }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
