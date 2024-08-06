import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsModule} from "@ngxs/store";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {AppRoutingModule} from "./app-routing.module";
import {LoginInterceptor} from "./interceptor/login.interceptor";
import {RecipeCreateComponent} from "./recipe-create/recipe-create.component";
import {AdminRecipeComponent} from "./admin/admin-recipe/admin-recipe.component";
import {RecipeCatalogInfoComponent} from "./recipe-catalog/recipe-catalog-info/recipe-catalog-info.component";
import {RecipeCatalogComponent} from "./recipe-catalog/recipe-catalog.component";
import {AdminUsersInfoComponent} from "./admin/admin-users/admin-users-info/admin-users-info.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";
import {ErrorComponent} from "./error/error.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AdminRecipeInfoComponent} from "./admin/admin-recipe/admin-recipe-info/admin-recipe-info.component";
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AdminComponent} from "./admin/admin.component";


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    RegistrationComponent,
    AdminRecipeInfoComponent,
    RecipeCreateComponent,
    AdminRecipeComponent,
    RecipeCatalogComponent,
    RecipeCatalogInfoComponent,
    AdminUsersComponent,
    AdminUsersInfoComponent,
    ErrorComponent,
    RecipeListComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterOutlet,
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot(),
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
