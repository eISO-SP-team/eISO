import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  addCustomerForm: FormGroup;

  newCompanyName = this.customerService.selectedCustomerInService.customer_name;
  newType = this.customerService.selectedCustomerInService.customer_type;
  newTaxId = this.customerService.selectedCustomerInService.tax_id;
  newPrefix = this.customerService.selectedCustomerInService.customer_contact.prefix;
  newMobile = this.customerService.selectedCustomerInService.customer_contact.mobile;
  newFirstName = this.customerService.selectedCustomerInService.customer_contact.first_name;
  newMiddleName = this.customerService.selectedCustomerInService.customer_contact.middle_name;
  newLastName = this.customerService.selectedCustomerInService.customer_contact.last_name;
  newPhoneNumber = this.customerService.selectedCustomerInService.customer_contact.phone_number;
  newFaxNumber = this.customerService.selectedCustomerInService.customer_contact.fax_number;
  newExtension = this.customerService.selectedCustomerInService.customer_contact.extension_number;
  newEmail = this.customerService.selectedCustomerInService.customer_contact.email;
  newCountry = this.customerService.selectedCustomerInService.customer_address.country;
  newZipcode = this.customerService.selectedCustomerInService.customer_address.zip_code;
  newAddress1 = this.customerService.selectedCustomerInService.customer_address.address_1;
  newAddress2 = this.customerService.selectedCustomerInService.customer_address.address_2;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  newEdit: any;

  constructor(public customerService: CustomerService, public _location: Location) { }

  ngOnInit() {
    console.log(JSON.stringify(this.customerService.selectedCustomerInService));

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
    });
    this.addCustomerForm.disable();
  }

  toggleDisabled() {
    this.addCustomerForm.enable();
  }

  updateEdits() {
    this.newEdit = {
      customer_name: this.newCompanyName,
      customer_type: this.newType,
      tax_id: this.newTaxId,
      customer_contact: {
        prefix: this.newPrefix,
        mobile: this.newMobile,
        last_name: this.newLastName,
        middle_name: this.newMiddleName,
        fax_number: this.newFaxNumber,
        created_by: this.customerService.selectedCustomerInService.customer_contact.created_by,
        uploaded_by: this.customerService.selectedCustomerInService.customer_contact.uploaded_by,
        extension_number: this.newExtension,
        uploaded_date: this.customerService.selectedCustomerInService.customer_contact.uploaded_date,
        phone_number: this.newPhoneNumber,
        created_date: this.customerService.selectedCustomerInService.customer_contact.created_date,
        customer_id: this.customerService.selectedCustomerInService.customer_contact.customer_id,
        first_name: this.newFirstName,
        email: this.newEmail,
      },
      customer_address: {
        country: this.newCountry,
        uploaded_by: this.customerService.selectedCustomerInService.customer_address.uploaded_by,
        address_1: this.newAddress1,
        address_2: this.newAddress2,
        uploaded_date: this.customerService.selectedCustomerInService.customer_address.uploaded_date,
        created_date: this.customerService.selectedCustomerInService.customer_address.created_date,
        customer_id: this.customerService.selectedCustomerInService.customer_address.customer_id,
        created_by: this.customerService.selectedCustomerInService.customer_address.uploaded_by,
        zip_code: this.newZipcode,
      },
      created_by: this.customerService.selectedCustomerInService.created_by,
      created_date: this.customerService.selectedCustomerInService.created_date,
    };

    // this.newEdit = {
    //   "customer_name": "Joe23",
    //   "customer_type": "Prospect",
    //   "tax_id": "123",
    //   "customer_contact": {
    //     "prefix": "Mr",
    //     "mobile": "87654321",
    //     "last_name": "Watson",
    //     "middle_name": "Miller",
    //     "fax_number": "12345678",
    //     "created_by": "Jack",
    //     "uploaded_by": "Jack",
    //     "extension_number": "123",
    //     "uploaded_date": "2019-11-26",
    //     "phone_number": "67891234",
    //     "created_date": "2019-11-26",
    //     "customer_id": "001",
    //     "first_name": "Jack",
    //     "email": "jackmillerwatson@abc.com"
    //   },
    //   "customer_address": {
    //     "country": "Singapore",
    //     "uploaded_by": "Jack",
    //     "address_1": "Blk 326",
    //     "address_2": "Neilson Road",
    //     "uploaded_date": "2019-11-26",
    //     "created_date": "2019-11-26",
    //     "customer_id": "001",
    //     "created_by": "Jack",
    //     "zip_code": "123456"
    //   },
    //   "created_by": "Jack",
    //   "created_date": "2020-01-25T02:28:21.641Z"
    // }
    var data = JSON.stringify(this.newEdit);
    this.customerService.updateCustomer(this.customerService.selectedCustomerInService.id, data)
      .subscribe((data) => {
        console.log("Updated: " + data)
        this._location.back();
      });
  }

}
