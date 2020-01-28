import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Customer } from "../shared/model/customer.model";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';

interface Type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  type: Type[];

  selectedType: Type;

  addCustomerForm: FormGroup;

  items: MenuItem[];

  activeIndex: number = 0;

  constructor(private messageService: MessageService, public customerService: CustomerService, public _location: Location) {
    this.type = [
      { name: 'Customer', value: 'Customer' },
      { name: 'Prospect', value: 'Prospect' },
    ];
  }

  ngOnInit() {

    this.addCustomerForm = new FormGroup({
      'companyName': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      "tax_id": new FormControl(null, [Validators.required]),
      "prefix": new FormControl(null, [Validators.required]),
      "mobile": new FormControl(null, [Validators.required]),
      "last_name": new FormControl(null, [Validators.required]),
      "middle_name": new FormControl(null, [Validators.required]),
      "first_name": new FormControl(null, [Validators.required]),
      "fax_number": new FormControl(null, [Validators.required]),
      "extension_number": new FormControl(null, [Validators.required]),
      "phone_number": new FormControl(null, [Validators.required]),
      "email": new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'address1': new FormControl(null, [Validators.required]),
      'address2': new FormControl(null, [Validators.required]),
      'zipcode': new FormControl(null, [Validators.required]),
    })
  }

  onAddEnquiry() {
    this.customerService.addCustomer(new Customer(
      0,
      this.addCustomerForm.value.companyName,
      this.selectedType.value,
      this.addCustomerForm.value.country,
      this.addCustomerForm.value.city,
      this.addCustomerForm.value.address1,
      this.addCustomerForm.value.address2,
      this.addCustomerForm.value.zipcode,
      this.addCustomerForm.value.contacts,
    ));
    this._location.back();
  }
}

