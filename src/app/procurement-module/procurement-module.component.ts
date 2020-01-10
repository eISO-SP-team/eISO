import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procurement-module',
  templateUrl: './procurement-module.component.html',
  styleUrls: ['./procurement-module.component.css']
})
export class ProcurementModuleComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
