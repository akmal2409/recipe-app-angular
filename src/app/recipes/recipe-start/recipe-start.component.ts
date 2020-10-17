import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  recipeDeleted = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        if (params.has('recipeDeleted')){
          this.showDeleteAlert();
        }
      });
  }

  showDeleteAlert(): void {
    this.recipeDeleted = true;
    setTimeout(() => {
      this.recipeDeleted = false;
    } , 4000);
  }

}
