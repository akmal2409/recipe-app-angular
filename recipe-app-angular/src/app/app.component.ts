import { Component } from '@angular/core';
import {ToastService} from './toast/toast.service';
import {slideInAnimation} from './shared/animations';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent{
  // state = 'recipes';
  //
  // displaySection(state: string){
  //   this.state = state;
  // }


  prepareRoute(mainOutlet: RouterOutlet): any {
    return mainOutlet && mainOutlet.activatedRouteData && mainOutlet.activatedRouteData.animation;
  }
}
