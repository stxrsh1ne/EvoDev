import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";
import {AdminUsersInfoComponent} from "./admin/admin-users/admin-users-info/admin-users-info.component";
import {ErrorComponent} from "./error/error.component";
import {RecipeCatalogInfoComponent} from "./recipe-catalog/recipe-catalog-info/recipe-catalog-info.component";
import {RecipeCatalogComponent} from "./recipe-catalog/recipe-catalog.component";
import {RecipeCreateComponent} from "./recipe-create/recipe-create.component";
import {AccessRoleGuard} from "./acces-role/access-role.guard";
import {AdminRecipeInfoComponent} from "./admin/admin-recipe/admin-recipe-info/admin-recipe-info.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminRecipeComponent} from "./admin/admin-recipe/admin-recipe.component";


const routes: Routes = [
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'create-recipe',
    component: RecipeCreateComponent,
    canActivate: [AccessRoleGuard],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'users', component: AdminUsersComponent},
      {path: 'recipes', component: AdminRecipeComponent},
      {path: '', redirectTo: 'users', pathMatch: 'full'}
    ]
  },
  {
    path: 'admin/recipes/:id',
    component: AdminRecipeInfoComponent,
    canActivate: [AccessRoleGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'recipes',
    component: RecipeListComponent,
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AccessRoleGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'admin/users/:id',
    component: AdminUsersInfoComponent,
    canActivate: [AccessRoleGuard],
    data: {roles: ['admin']}
  },
  {path: '', component: RecipeCatalogComponent},
  {path: 'recipes/:id', component: RecipeCatalogInfoComponent},

  {path: 'error/:code', component: ErrorComponent},
  {path: '**', redirectTo: '/error/404'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
