import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput", {static: true}) ingredientName: ElementRef;
  @ViewChild('amountInput', {static: true}) ingredientAmount: ElementRef;

  @Output() ingredientEmitted = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(){
    this.ingredientEmitted.emit(new Ingredient(this.ingredientName.nativeElement.value,
      this.ingredientAmount.nativeElement.value));
  }

}
