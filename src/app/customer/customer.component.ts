import { Component, OnInit } from '@angular/core';
import { ToggleDisplayService } from '../shared/service/toggle-display.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public toggleDisplayService: ToggleDisplayService, public router: Router) { }

  ngOnInit() { }
}
