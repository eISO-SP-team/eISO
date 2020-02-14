import { Component } from '@angular/core';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
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

  constructor(public toggleDisplayService: ToggleDisplayService, private router: Router, private spinner: NgxSpinnerService) {
    this.isCollapsed = false;

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        console.log("nav start")
        this.spinner.show();
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel) {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }

      if (routerEvent instanceof NavigationError) {
        this.router.navigate(['/sales-module']);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }

    });

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
