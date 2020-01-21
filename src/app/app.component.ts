import { Component } from '@angular/core';
import { ToggleDisplayService } from './shared/service/toggle-display.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eISOv2';

  text: string;

  disabled: boolean = true;

  constructor(public toggleDisplayService: ToggleDisplayService) { }

  ngOnInit() {
    this.toggleDisplayService.isViewable;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
