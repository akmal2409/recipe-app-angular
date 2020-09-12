import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput", {static: true}) ingredientName: ElementRef;
  @ViewChild('amountInput', {static: true}) ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient(){
    this.shoppingListService.addIngredient(
      new Ingredient(this.ingredientName.nativeElement.value,
        this.ingredientAmount.nativeElement.value)
    );
  }

}
