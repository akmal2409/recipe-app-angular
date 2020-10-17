import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Beef', 1),
    new Ingredient('Tomatoes', 10)
  ];

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredient(editedItem: Ingredient, index: number) {
    this.ingredients[index] = editedItem;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
