import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eISOv2';
  
  text: string;

  disabled: boolean = true;

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
