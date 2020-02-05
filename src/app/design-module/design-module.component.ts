import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-module',
  templateUrl: './design-module.component.html',
  styleUrls: ['./design-module.component.css']
})
export class DesignModuleComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
