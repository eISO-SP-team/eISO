import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-control-module',
  templateUrl: './process-control-module.component.html',
  styleUrls: ['./process-control-module.component.css']
})
export class ProcessControlModuleComponent implements OnInit {

  constructor(public router: Router,) { }

  ngOnInit() {
  }

}
