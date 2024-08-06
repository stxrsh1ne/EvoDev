import { Component, OnInit } from '@angular/core';
import { FeatureItem, Recipe } from "../interface/recipe";
import { DataService } from "../service/data.service";
import { Router } from '@angular/router';
import * as Notiflix from "notiflix";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.css']
})
export class RecipeCatalogComponent implements OnInit {
  error: string | null = null;
  allRecipes: Recipe[] = [];
  otherRecipes: Recipe[] = [];
  additionalRecipes: Recipe[] = [];
  remainingRecipies: Recipe[] = [];

  newsletterForm: FormGroup;

  features: FeatureItem[] = [
    {
      title: 'Проверенные рецепты',
      description: 'Вы можете найти множество проверенных рецептов, которые помогут вам приготовить вкусные и разнообразные блюда для всей семьи.'
    },
    {
      title: 'Для всех',
      description: 'Вы сможете найти легкие и вкусные блюда, которые понравятся и детям, и взрослым.'
    },
    {
      title: 'Огромное разнообразие',
      description: 'Разнообразие рецептов для всех порадует самых разносторонних гурманов'
    },
    {
      title: 'Храним рецепты для вас',
      description: 'Это отличный способ организовать и хранить свою коллекцию кулинарных рецептов. Вместо того, чтобы хранить бумажные копии или оставлять их в разных кулинарных книгах.'
    }
  ];

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(filter: number | null = null): void {
    this.dataService.getRecipes(filter).subscribe({
      next: (data: Recipe[]) => {
        this.allRecipes = data;
        this.remainingRecipies = this.allRecipes
          .filter(recipe => !this.otherRecipes.includes(recipe))
          .slice(0, 3);
        this.otherRecipes = this.getRandomRecipes(this.allRecipes, 3);
        this.additionalRecipes = this.getRandomRecipes(this.allRecipes, 4);
      },
      error: (err) => this.error = 'Не удалось загрузить рецепты'
    });
  }

  getRandomRecipes(recipes: Recipe[], count: number): Recipe[] {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  loadMoreRecipes(): void {
    const moreRecipes = this.getMoreRecipes(this.allRecipes, 3);
    this.otherRecipes = [...this.otherRecipes, ...moreRecipes];
  }

  getMoreRecipes(recipes: Recipe[], count: number): Recipe[] {
    const remainingRecipes = recipes.filter(recipe => !this.otherRecipes.includes(recipe));
    return this.getRandomRecipes(remainingRecipes, count);
  }

  goToDetail(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      Notiflix.Notify.success('Успешная подписка!', {
        ID: 'okey',
        timeout: 5000,
        showOnlyTheLastOne: true,
        closeButton: true,
      });
    } else {
      Notiflix.Notify.failure('Введите корректный email', {
        ID: 'error',
        timeout: 5000,
        showOnlyTheLastOne: true,
        closeButton: true,
      });
    }
  }

  get email() {
    return this.newsletterForm.get('email');
  }
}
