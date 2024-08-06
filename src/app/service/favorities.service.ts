import { Injectable } from '@angular/core';
import { Notify } from 'notiflix';
import { DataService } from './data.service'; // Убедитесь, что импортируете DataService
import { Recipe } from '../interface/recipe'; // Импортируйте интерфейс Recipe

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKeyPrefix = 'favorites_';
  private userId: string | null = null;
  private favorites: Set<string> = new Set();

  constructor(private dataService: DataService) {}

  setUser(userId: string | null): void {
    this.userId = userId;
    this.loadFavorites();
  }

  private getStorageKey(): string {
    return `${this.favoritesKeyPrefix}${this.userId}`;
  }

  private loadFavorites(): void {
    if (!this.userId) {
      this.favorites.clear();
      return;
    }

    const storedFavorites = localStorage.getItem(this.getStorageKey());
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    } else {
      this.favorites.clear();
    }

    this.dataService.getFavorites(this.userId).subscribe(
      (favorites: Recipe[]) => {
        favorites.forEach(recipe => this.favorites.add(recipe.id));
        this.saveFavorites(); // Обновляем localStorage
      },
      (error: any) => { // Указание типа для error
        console.error('Ошибка при загрузке избранных рецептов:', error);
      }
    );
  }

  private saveFavorites(): void {
    if (this.userId) {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(Array.from(this.favorites)));
    }
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.has(recipeId);
  }

  toggleFavorite(recipeId: string): void {
    if (this.isFavorite(recipeId)) {
      this.favorites.delete(recipeId);
      Notify.info('Рецепт удален из избранного');
    } else {
      this.favorites.add(recipeId);
      Notify.success('Рецепт добавлен в избранное');
    }
    this.saveFavorites();
  }

  getFavorites(): string[] {
    return Array.from(this.favorites);
  }
}
