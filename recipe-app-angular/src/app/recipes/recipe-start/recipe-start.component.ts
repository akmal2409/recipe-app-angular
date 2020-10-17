import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../toast/toast.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  recipeDeleted = false;
  recipeCreatedOrUpdated: string;
  successMessage = false;

  constructor(private route: ActivatedRoute,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        if (params.has('recipeDeleted')){
          this.showDeleteAlert();
        }
        if (params.has('showMessage')) {
          this.recipeCreatedOrUpdated = params.get('showMessage');
          this.showSuccessMessage();
        }
      });
  }

  showDeleteAlert(): void {
    this.recipeDeleted = true;
    setTimeout(() => {
      this.recipeDeleted = false;
    } , 4000);
  }

  private showSuccessMessage(): void {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 4000);
  }
}
