import { Component } from '@angular/core';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eISOv2';

  text: string;

  constructor(public toggleDisplayService: ToggleDisplayService, private router: Router) { }

  ngOnInit() {
    // this.toggleDisplayService.isViewable;
  }
  ngAfterViewInit() {
    debugger;
    this.router.url;
  }
}
