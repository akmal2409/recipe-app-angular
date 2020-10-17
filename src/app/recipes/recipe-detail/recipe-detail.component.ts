import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, ParamMap, Params, Route, Router} from '@angular/router';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle, faUtensils} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  basketIcon = faShoppingBasket;
  ingredientAdded = false;
  recipeDeleted = false;
  faChefHat = faUtensils;
  faInfo = faInfoCircle;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList(): void {
    this.recipe.ingredients.forEach(
      ingredient => this.shoppingListService.addIngredient(ingredient)
    );

    this.activatePopUp(this.ingredientAdded);
  }

  activatePopUp(recipeDeleted?: boolean, ingredientsAdded?: boolean): void {
    if (!ingredientsAdded) {
      this.ingredientAdded = true;

      setTimeout(() => {
        this.ingredientAdded = false;
      }, 3000);
    }

    if (!recipeDeleted) {
      this.router.navigate(['../'], {queryParams: { recipeDeleted: '1'}, relativeTo: this.route});
    }
  }

  onEditRecipe(): void {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onAddIngredientToShoppingList(index: number): void {
    this.shoppingListService.addIngredient(this.recipe.ingredients[index]);

    this.activatePopUp();
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipeById(this.id);

    this.activatePopUp(this.recipeDeleted);
  }
}
