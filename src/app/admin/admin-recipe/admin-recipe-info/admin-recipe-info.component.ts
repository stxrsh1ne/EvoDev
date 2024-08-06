import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { CookingStep, Ingredient, Recipe } from '../../../interface/recipe';
import * as Notiflix from 'notiflix';
import {Location} from "@angular/common";

@Component({
  selector: 'app-admin-recipe-info',
  templateUrl: './admin-recipe-info.component.html',
  styleUrls: ['./admin-recipe-info.component.css']
})
export class AdminRecipeInfoComponent implements OnInit {
  editRecipeForm: FormGroup;
  recipeId: string | null;

  constructor(
    private fb: FormBuilder,
    private recipeService: DataService,
    private route: ActivatedRoute, private location: Location
  ) {
    this.recipeId = null;
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: this.fb.array([this.fb.control('', Validators.required)]),
      timeCooking: ['', Validators.required],
      foodValue: this.fb.group({
        calories: ['', Validators.required],
        fats: ['', Validators.required],
        carbohydrates: ['', Validators.required],
        proteins: ['', Validators.required]
      }),
      cookingSteps: this.fb.array([this.createCookingStep()]),
      ingredients: this.fb.array([this.createIngredient()])
    });
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.loadRecipe(this.recipeId);
    }
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.editRecipeForm.patchValue({
        title: recipe.title,
        body: recipe.body,
        timeCooking: recipe.timeCooking,
        foodValue: recipe.foodValue
      });

      this.setTags(recipe.tags);
      this.setCookingSteps(recipe.cookingSteps);
      this.setIngredients(recipe.ingredients);
    });
  }

  setTags(tags: string[]): void {
    const tagsArray = this.editRecipeForm.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach(tag => {
      tagsArray.push(this.fb.control(tag, Validators.required));
    });
  }

  setCookingSteps(steps: CookingStep[]): void {
    const stepsArray = this.editRecipeForm.get('cookingSteps') as FormArray;
    stepsArray.clear();
    steps.forEach(step => {
      stepsArray.push(this.fb.group({
        title: [step.title, Validators.required],
        description: [step.description, Validators.required]
      }));
    });
  }

  setIngredients(ingredients: Ingredient[]): void {
    const ingredientsArray = this.editRecipeForm.get('ingredients') as FormArray;
    ingredientsArray.clear();
    ingredients.forEach(ingredient => {
      ingredientsArray.push(this.fb.group({
        title: [ingredient.title, Validators.required],
        description: [ingredient.description, Validators.required]
      }));
    });
  }

  createCookingStep(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addCookingStep(): void {
    this.cookingSteps.push(this.createCookingStep());
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  get tags(): FormArray {
    return this.editRecipeForm.get('tags') as FormArray;
  }

  get cookingSteps(): FormArray {
    return this.editRecipeForm.get('cookingSteps') as FormArray;
  }

  get ingredients(): FormArray {
    return this.editRecipeForm.get('ingredients') as FormArray;
  }

  editRecipe(): void {
    if (this.editRecipeForm.valid) {
      const recipe: Partial<Recipe> = this.editRecipeForm.value;
      if (this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, recipe).subscribe(
          () => {
            Notiflix.Notify.success('Рецепт успешно обновлен');

            this.editRecipeForm.reset();
            this.location.back();
          },
          error => {
            console.error('Ошибка:', error);
            Notiflix.Notify.failure('Ошибка при обновлении рецепта. Пожалуйста, попробуйте еще раз.');
          }
        );
      }
    } else {
      Notiflix.Notify.warning('Пожалуйста, заполните все обязательные поля');
    }
  }
}
