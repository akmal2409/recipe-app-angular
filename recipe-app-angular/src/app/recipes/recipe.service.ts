import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {

  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(0, 'My Meat', 'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potatoes', 2)
      ]),
    new Recipe(1, 'Chorizo & mozzarella gnocchi bake', 'This is simply a test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=408%2C370',
      [
        new Ingredient('Mozarella', 1),
        new Ingredient('Potatoes', 2)
      ])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.emitNewRecipes();
  }

  emitNewRecipes(): void {
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number): void {
    this.recipes[index] = recipe;
    this.emitNewRecipes();
  }

  deleteRecipeById(id: number): void {
    this.recipes.splice(id, 1);
    this.emitNewRecipes();
  }


}
