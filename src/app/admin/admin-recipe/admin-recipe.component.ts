import {Component} from '@angular/core';
import * as Notiflix from "notiflix";
import {DataService} from "../../service/data.service";
import {Recipe} from "../../interface/recipe";

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent {
  error: string | null = null;
  recipes: Recipe[] = [];
  isModalVisible: boolean = false;
  selectedRecipeId: string | null = null;

  constructor(private dataService: DataService) {
    this.loadRecipes();
  }

  loadRecipes() {
    this.dataService.getRecipes().subscribe({
      next: (recipes) => this.recipes = recipes,
      error: (err) => this.handleError('Loading recipes', err)
    });
  }

  openModal(recipeId: string) {
    this.selectedRecipeId = recipeId;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedRecipeId = null;
  }

  deleteRecipe(id: string) {
    this.dataService.deleteRecipeInfo(id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        Notiflix.Notify.success('Рецепт успешно удален');
        this.closeModal();
      },
      error: (err) => this.handleError('Deleting recipe', err)
    });
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Ошибка ${context}: ${err.message}`;
  }
}
