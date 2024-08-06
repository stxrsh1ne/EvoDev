import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as Notiflix from "notiflix";
import {DataService} from "../../service/data.service";
import {Recipe} from "../../interface/recipe";
import {FavoritesService} from "../../service/favorities.service";

@Component({
  selector: 'app-recipe-catalog-info',
  templateUrl: './recipe-catalog-info.component.html',
  styleUrls: ['./recipe-catalog-info.component.css']
})
export class RecipeCatalogInfoComponent implements OnInit {
  commentData = {postId: '', text: ''};
  recipeId: string = '';
  recipe: Recipe | null = null;
  error: string | null = null;
  allRecipes: Recipe[] = [];
  otherRecipes: Recipe[] = [];
  additionalRecipes: Recipe[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.getRecipeById();
      this.loadRecipes();
    });
  }

  private resetCommentForm() {
    this.commentData = {
      postId: '',
      text: ''
    };
  }

  Share() {
    Notiflix.Confirm.show(
      'Поделиться этим рецептом?',
      'Вы хотите поделиться этим рецептом со всеми?',
      'Закрыть',
      'Поделиться',


      function () {
      },
      function () {
      },
      {
        width: '512px',
        fontFamily: 'Inter',
        borderRadius: '8px',
        titleColor: 'rgba(17, 24, 39, 1)',
        cancelButtonBackground: '#3C3B6E',
        cancelButtonColor: '#ffffff',
        okButtonBackground: '#f1f1f1',
        okButtonColor: ' rgba(55, 65, 81, 1)',
      })
  }

  printPage() {
    window.print();
  }

  goToDetail(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  getRecipeById(): void {
    if (!this.recipeId) {
      this.error = 'Введите ID рецепта';
      return;
    }

    this.dataService.getRecipeById(this.recipeId).subscribe(
      data => {
        this.recipe = data;
        this.error = null;
      },
      error => {
        this.error = 'Ошибка при получении рецепта';
        this.recipe = null;
      }
    );
  }

  loadRecipes(filter: number | null = null): void {
    this.dataService.getRecipes(filter).subscribe({
      next: (data: Recipe[]) => {
        this.allRecipes = data;
        this.otherRecipes = this.getRandomRecipes(this.allRecipes, 3);
        this.additionalRecipes = this.getRandomRecipes(this.allRecipes.filter(recipe => !this.otherRecipes.includes(recipe)), 4);
      },
      error: (err) => this.error = 'Не удалось загрузить рецепты'
    });
  }

  getRandomRecipes(recipes: Recipe[], count: number): Recipe[] {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  addComment() {
    if (this.recipeId && this.commentData.text) {
      this.dataService.addComment(this.recipeId, this.commentData.text).subscribe({
        next: () => {
          Notiflix.Notify.success('Comment added successfully');
          this.resetCommentForm();
          this.getRecipeById();
        },
        error: (err) => this.handleError('Adding comment', err)
      });
    } else {
      Notiflix.Notify.warning('Comment text is required');
    }
  }

  toggleIngredient(ingredient: any) {
    ingredient.completed = !ingredient.completed;
  }

  toggleStep(step: any) {
    step.completed = !step.completed;
  }

  toggleFavorite(recipeId: string): void {
    this.favoritesService.toggleFavorite(recipeId);
  }

  isFavorite(recipeId: string): boolean {
    return this.favoritesService.isFavorite(recipeId);
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Error ${context}: ${err.message}`;
  }
}
