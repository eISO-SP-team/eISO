import { Component, OnInit } from '@angular/core';
import { ToggleDisplayService } from "../shared/service/toggle-display.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
  providers: [ToggleDisplayService]
})
export class QuotationComponent implements OnInit {

  constructor(public toggleDisplayService: ToggleDisplayService, public router: Router) { }
  
  /** Life Cycle hook to initialize values */
  ngOnInit() { this.toggleDisplayService.isViewable; }

}
