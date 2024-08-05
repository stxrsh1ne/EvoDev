import {Component} from '@angular/core';
import * as Notiflix from "notiflix";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {Recipe} from "../../interface/recipe";

@Component({
  selector: 'app-recipe-catalog-info',
  templateUrl: './recipe-catalog-info.component.html',
  styleUrls: ['./recipe-catalog-info.component.css']
})
export class RecipeCatalogInfoComponent {
  commentData = {postId: '', text: ''};
  recipeId: string = '';
  recipe: Recipe | null = null;
  error: string | null = null;

  constructor(private dataService: DataService) {
  }

  private resetCommentForm() {
    this.commentData = {
      postId: '',
      text: ''
    };
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

  addComment() {
    if (this.commentData.postId && this.commentData.text) {
      this.dataService.addComment(this.commentData.postId, this.commentData.text).subscribe({
        next: () => {
          Notiflix.Notify.success('Comment added successfully');
          this.resetCommentForm();
        },
        error: (err) => this.handleError('Adding comment', err)
      });
    } else {
      Notiflix.Notify.warning('Post ID and comment text are required');
    }
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Error ${context}: ${err.message}`;
  }
}
