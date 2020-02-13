import { Component, NgZone } from '@angular/core';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { Router, NavigationEnd } from '@angular/router';
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
      if (window.innerWidth < 1025) {
        // this.onMenuClose(false);
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
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

  logout() {
    this.toggleDisplayService.toggle();
    this.router.navigate(['login']);
  }
}
