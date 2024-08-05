import { Component } from '@angular/core';
import {Recipe} from "../interface/recipe";
import * as Notiflix from "notiflix";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {

  createRecipeForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createRecipeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tag: ['', Validators.required],
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
  get cookingSteps(): FormArray {
    return this.createRecipeForm.get('cookingSteps') as FormArray;
  }

  get ingredients(): FormArray {
    return this.createRecipeForm.get('ingredients') as FormArray;
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

  createRecipe(): void {
    if (this.createRecipeForm.valid) {
      const recipe: Recipe = this.createRecipeForm.value;
      this.dataService.createRecipe(recipe).subscribe(
        response => {
          Notiflix.Notify.success('Рецепт успешно создан');
          this.createRecipeForm.reset();
        },
        error => {
          Notiflix.Notify.failure('Ошибка при создании рецепта');
        }
      );
    } else {
      Notiflix.Notify.warning('Пожалуйста, заполните все обязательные поля');
    }
  }
}
