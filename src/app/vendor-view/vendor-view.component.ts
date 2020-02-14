import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

interface Type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.css']
})
export class vendorViewComponent implements OnInit {

  addVendorForm: FormGroup;

  type: Type[];

  prefix: Type[];

  selectedType: Type;

  selectedPrefix: Type;

  activeIndex: number = 0;

  display: boolean;

  testEntry: any;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(public vendorService: VendorService, public _location: Location, public router: Router) {
    this.type = [
      { name: 'Approved', value: 'Pass' },
      { name: 'Pending', value: 'Fail' },
    ];

    this.prefix = [
      { name: 'Mr', value: 'Mr' },
      { name: 'Mrs', value: 'Mrs' },
      { name: 'Miss', value: 'Miss' },
    ]
  }


  newName = this.vendorService.selectedVendornService.vendor_name;
  newType = this.vendorService.selectedVendornService.vendor_type;
  newProducts = this.vendorService.selectedVendornService.products;
  newTaxId = this.vendorService.selectedVendornService.tax_id;
  newServices = this.vendorService.selectedVendornService.services;
  newCountry = this.vendorService.selectedVendornService.vendor_address.country;
  newZipcode = this.vendorService.selectedVendornService.vendor_address.zip_code
  newAddress1 = this.vendorService.selectedVendornService.vendor_address.address_1;
  newAddress2 = this.vendorService.selectedVendornService.vendor_address.address_2;
  newPrefix = this.vendorService.selectedVendornService.vendor_contact.prefix;
  newFirstName = this.vendorService.selectedVendornService.vendor_contact.first_name;
  newMiddleName = this.vendorService.selectedVendornService.vendor_contact.middle_name;
  newLastName = this.vendorService.selectedVendornService.vendor_contact.last_name;
  newEmail = this.vendorService.selectedVendornService.vendor_contact.email;
  newPhoneNo = this.vendorService.selectedVendornService.vendor_contact.phone_number;
  newExtension = this.vendorService.selectedVendornService.vendor_contact.extension_number;
  newMobileNo = this.vendorService.selectedVendornService.vendor_contact.mobile;
  newFax = this.vendorService.selectedVendornService.vendor_contact.fax_number;

  ngOnInit() {
    this.addVendorForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'products': new FormControl(null, [Validators.required]),
      'taxId': new FormControl(null, [Validators.required]),
      'services': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'zipcode': new FormControl(null, [Validators.required]),
      'address1': new FormControl(null, [Validators.required]),
      'address2': new FormControl(null, [Validators.required]),
      'prefix': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'phoneNo': new FormControl(null, [Validators.required]),
      'extension': new FormControl(null, [Validators.required]),
      'mobileNo': new FormControl(null, [Validators.required]),
      'fax': new FormControl(null, [Validators.required]),
    })
  }
  onAddEnquiry() {
    this.testEntry = {
      vendor_code: this.vendorService.selectedVendornService.vendor_code,
      vendor_name: this.newName,
      vendor_type: this.newType,
      products: this.newProducts,
      tax_id: this.newTaxId,
      vendor_address: {
        country: this.newCountry,
        address_1: this.newAddress1,
        address_2: this.newAddress2,
        vendor_id: this.vendorService.selectedVendornService.id,
        updated_by: "Johnny",
        created_date: this.vendorService.selectedVendornService.vendor_address.created_date,
        updated_date: this.myDate,
        zip_code: this.newZipcode,
      },
      vendor_contact: [{
        prefix: this.newPrefix,
        vendor_id: this.vendorService.selectedVendornService.id,
        mobile: this.newMobileNo,
        last_name: this.newLastName,
        middle_name: this.newMiddleName,
        fax_number: this.newFax,
        created_by: "Johnny",
        extension_number: this.newExtension,
        updated_by: "Johnny",
        phone_number: this.newPhoneNo,
        created_date: this.vendorService.selectedVendornService.vendor_contact.created_date,
        updated_date: this.myDate,
        first_name: this.newFirstName,
        email: this.newEmail,
      }],
      vendor_evaluation: [],
      created_by: "Johnny",
      created_date: this.vendorService.selectedVendornService.created_date,
    };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.vendorService.updateVendors(data)
      .subscribe((data) => {
        console.log(data)
        this.vendorService.vendorList.push(this.testEntry);
      });
    this._location.back();
  }

  showDialog() {
    this.display = true;
  }

}
