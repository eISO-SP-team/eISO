import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SalesorderService } from "../shared/service/salesorder.service";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'

interface Type {
  name: string;
  value: string;
}

interface cust {
  name: string;
  value: string;
}

@Component({
  selector: 'app-salesorder-create',
  templateUrl: './salesorder-create.component.html',
  styleUrls: ['./salesorder-create.component.css']
})

export class SalesorderCreateComponent implements OnInit {

  customer: cust[];

  prefix: Type[];

  selectedCustomer: any;

  addSalesOrderForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  newList: SelectItem[];

  constructor(public customerService: CustomerService, public salesOrderService: SalesorderService, public _location: Location) {

  }

  ngOnInit() {
    this.customerList = this.customerService.loadCustomers().subscribe(responseData => {
      this.customerService.customerList = responseData.body;
      this.customerList = this.customerService.customerList;
      this.newList = [];
      for (let i = 0; i < this.customerList.length; i++) {
        this.newList.push({ label: this.customerList[i].customer_name, value: this.customerList[i].id });
      } 
    });

    this.addSalesOrderForm = new FormGroup({
      'quotation_number': new FormControl(null, [Validators.required]),
      'customer_id': new FormControl(null, [Validators.required]),
      "date": new FormControl(null, [Validators.required]),
      "subject": new FormControl(null, [Validators.required]),
      "pic": new FormControl(null, [Validators.required]),
      "tenderLocation": new FormControl(null, [Validators.required]),
      "picEmail": new FormControl(null, [Validators.required]),
      "total": new FormControl(null, [Validators.required]),
      "deposit": new FormControl(null, [Validators.required]),
    })
  }

}
