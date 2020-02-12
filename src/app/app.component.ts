import { Component, NgZone } from '@angular/core';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { Router } from '@angular/router';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eISOv2';

  text: string;

  isCollapsed: boolean;
  

  constructor(public toggleDisplayService: ToggleDisplayService, private router: Router) {
    this.isCollapsed = false;


    window.onresize = (e) => {
      //ngZone.run will help to run change detection
        if (window.innerWidth <= 1000){
          // this.onMenuClose(false);
          !this.isCollapsed
        }
        console.log("Width: " + window.innerWidth);
        console.log("Height: " + window.innerHeight);
    };
  }

  ngOnInit() {
    // this.toggleDisplayService.isViewable;
  }
  ngAfterViewInit() {
    this.router.url;
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  onMenuClose(event) {
    // console.log(event)
    this.collapse();
  }
}
