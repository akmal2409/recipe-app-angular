import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  displayWarning = false;
  recipeForm: FormGroup;
  urlRegex = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
  amountRegex = '^[1-9]+[0-9]*$';
  showAlert = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            name : new FormControl(ingredient.name, [Validators.required]),
            amount : new FormControl(ingredient.amount, [Validators.required,
              Validators.pattern(this.amountRegex)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      name : new FormControl(recipeName, [Validators.required]),
      imagePath : new FormControl(recipeImagePath, [Validators.required, Validators.pattern(this.urlRegex)]),
      description : new FormControl(recipeDescription, [Validators.required, Validators.minLength(10)]),
      ingredients : ingredients
    });
  }

  get controls()  {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(): void {
    // const recipe = new Recipe(
    //   null,
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.showSuccessAlert();

    setTimeout(() => {
      this.router.navigate(['/recipes']);
    } , 3000);
  }

  showSuccessAlert(): void {
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name : new FormControl('', [Validators.required]),
      amount : new FormControl('0', [Validators.required,
      Validators.pattern(this.amountRegex)])
    }));
  }

  onRemoveIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).controls.splice(index, 1);
  }
}
