import { Component, OnInit } from '@angular/core';
import { DataService } from "../service/data.service";
import { Recipe } from "../interface/recipe";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interface/user';
import {FavoritesService} from "../service/favorities.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  additionalRecipes: Recipe[] = [];
  userId!: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCurrentUser();
  }

  loadRecipes(): void {
    this.dataService.getRecipes().subscribe(recipes => {
      this.additionalRecipes = recipes;
    });
  }

  loadCurrentUser(): void {
    this.getUserById('currentUserId').subscribe(user => {
      this.userId = user.id;
      this.favoritesService.setUser(this.userId);
    });
  }

  goToDetail(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  isFavorite(recipeId: string): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    this.favoritesService.toggleFavorite(recipeId);
  }

  getUserById(id: string): Observable<User> {
    return this.dataService.getUserById(id).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }
}
