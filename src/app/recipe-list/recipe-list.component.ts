import { Component, OnInit } from '@angular/core';
import {DataService} from "../service/data.service";
import {Recipe} from "../interface/recipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  additionalRecipes: Recipe[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getRecipes().subscribe(recipes => {
      this.additionalRecipes = recipes;
    });
  }

  goToDetail(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }
}
