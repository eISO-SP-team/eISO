import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';

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

  prefix: Type[];

  selectedType: Type;

  selectedPrefix: Type;

  addCustomerForm: FormGroup;

  items: MenuItem[];

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(private messageService: MessageService, public customerService: CustomerService, public _location: Location) {
    this.type = [
      { name: 'Customer', value: 'Customer' },
      { name: 'Prospect', value: 'Prospect' },
    ];

    this.prefix = [
      { name: 'Mr', value: 'Mr' },
      { name: 'Mrs', value: 'Mrs' },
      { name: 'Miss', value: 'Miss' },
    ]
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
    this.testEntry = {
      customer_name: this.addCustomerForm.value.companyName,
      customer_type: this.selectedType.value,
      tax_id: this.addCustomerForm.value.tax_id,
      customer_contact: {
        prefix: this.selectedPrefix.value,
        mobile: this.addCustomerForm.value.mobile,
        last_name: this.addCustomerForm.value.last_name,
        middle_name: this.addCustomerForm.value.middle_name,
        fax_number: this.addCustomerForm.value.fax_number,
        created_by: "Joseph",
        uploaded_by: "Joseph",
        extension_number: this.addCustomerForm.value.extension_number,
        uploaded_date: this.myDate,
        phone_number: this.addCustomerForm.value.phone_number,
        created_date: this.myDate,
        customer_id: "030",
        first_name: this.addCustomerForm.value.first_name,
        email: this.addCustomerForm.value.email,
      },
      customer_address: {
        country: this.addCustomerForm.value.country,
        uploaded_by: "Joseph",
        address_1: this.addCustomerForm.value.address1,
        address_2: this.addCustomerForm.value.address2,
        uploaded_date: this.myDate,
        created_date: this.myDate,
        customer_id: "030",
        created_by: "Joseph",
        zip_code: this.addCustomerForm.value.zipcode,
      },
      created_by: "Joseph",
      created_date: ""
    };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.customerService.addCustomers(data)
      .subscribe((data) => {
        console.log(data)
        this.customerService.customerList.push(data);
        this.customerService.customerSubject.next(this.customerService.customerList);
      });
    this._location.back();
  }
}

