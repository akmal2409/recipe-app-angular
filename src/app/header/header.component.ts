import {Component, EventEmitter, Output} from "@angular/core";
import {state} from "@angular/animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Output() display = new EventEmitter<string>();
  state: string;

  ngOnInit() {

  }

  displayRecipes(){
    this.state = 'recipes';
    this.display.emit(this.state);
  }

  displayShoppingList(){
    this.state = 'list';
    this.display.emit(this.state);
  }
}
