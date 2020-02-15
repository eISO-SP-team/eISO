import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../shared/service/customer.service";
import { SalesorderService } from "../shared/service/salesorder.service";
import { QuotationService } from "../shared/service/quotation.service";

@Component({
  selector: 'app-sales-module',
  templateUrl: './sales-module.component.html',
  styleUrls: ['./sales-module.component.css']
})
export class SalesModuleComponent implements OnInit {

  constructor(public quotationService: QuotationService, public salesOrderService: SalesorderService, public customerService: CustomerService) { 
    this.customerService.rows = 3;
    this.quotationService.rows = 3;
    this.salesOrderService.rows = 3;
  }

  ngOnInit() {
  }

}
