import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InlineComponent} from "./inline/inline.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'open-graph',
    pathMatch: 'full'
  },
  {
    path: 'open-graph',
    title: 'Open Graph Page',
    component: InlineComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
