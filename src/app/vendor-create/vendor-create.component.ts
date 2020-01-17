import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Vendor } from "../shared/model/vendor.model";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
interface Type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css'],
})
export class vendorCreateComponent implements OnInit {

  type: Type[];

  prefix: Type[];

  selectedType: Type;

  selectedPrefix: Type;

  addVendorForm: FormGroup;

  items: MenuItem[];

  activeIndex: number = 0;

  testEntry: any;


  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(public vendorService: VendorService, public _location: Location, ) {
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

  // onAddEnquiry() {
  //   this.vendorService.addVendor(new Vendor(
  //     0,
  //     this.addVendorForm.value.name,
  //     this.addVendorForm.value.type,
  //     this.addVendorForm.value.products,
  //     this.addVendorForm.value.taxId,
  //     this.addVendorForm.value.services,
  //     this.addVendorForm.value.country,
  //     this.addVendorForm.value.zipcode,
  //     this.addVendorForm.value.address1,
  //     this.addVendorForm.value.address2,
  //     this.addVendorForm.value.prefix,
  //     this.addVendorForm.value.firstName,
  //     this.addVendorForm.value.middleName,
  //     this.addVendorForm.value.lastName,
  //     this.addVendorForm.value.email,
  //     this.addVendorForm.value.phoneNo,
  //     this.addVendorForm.value.extension,
  //     this.addVendorForm.value.mobileNo,
  //     this.addVendorForm.value.fax,
  //   ));
  //   this._location.back();
  // }

  onAddEnquiry() {
    this.testEntry = {
      vendor_code: "12345",
      vendor_name: this.addVendorForm.value.name,
      vendor_type: this.addVendorForm.value.type.value,
      products: this.addVendorForm.value.products,
      tax_id: this.addVendorForm.value.taxId,
      vendor_address: {
        country: this.addVendorForm.value.country,
        address1: this.addVendorForm.value.address1,
        address2: this.addVendorForm.value.address2,
        updated_by: "Johnny",
        created_date: this.myDate,
        updated_date: this.myDate,
        zip_code: this.addVendorForm.value.zipcode,
      },
      vendor_contact: [{
        prefix: this.addVendorForm.value.prefix.value,
        mobile: this.addVendorForm.value.mobileNo,
        last_name: this.addVendorForm.value.lastName,
        middle_name: this.addVendorForm.value.middleName,
        fax_number: this.addVendorForm.value.fax,
        created_by: "Johnny",
        vendor_id: "007",
        extension_number: this.addVendorForm.value.extension,
        updated_by: "Johnny",
        phone_number: this.addVendorForm.value.phoneNo,
        created_date: this.myDate,
        updated_date: this.myDate,
        first_name: this.addVendorForm.value.firstName,
        email: this.addVendorForm.value.email,
      }],
      vendor_evaluation: [],
      created_by: "Johnny",
      created_date: this.myDate,
    };
    // this.testEntry = {
    //   vendor_code: "12345",
    //   vendor_name: "Fake Store",
    //   vendor_type: "Pass",
    //   products: "Items",
    //   tax_id: "555",
    //   vendor_address: {
    //     country: "Singapore",
    //     address1: "Address1",
    //     address2: "Address2",
    //     updated_by: "Johnny",
    //     created_date: "31/01/2000",
    //     updated_date: "31/01/2000",
    //     zip_code: "123456",
    //   },
    //   vendor_contact: [{
    //     prefix: "Mr",
    //     mobile: "87654321",
    //     last_name: "Tan",
    //     middle_name: "Mark",
    //     fax_number: "654321",
    //     created_by: "Johnny",
    //     vendor_id: "007",
    //     extension_number: "123456",
    //     updated_by: "Johnny",
    //     phone_number: "87654321",
    //     created_date: "31/01/2000",
    //     updated_date: "31/01/2000",
    //     first_name: "Tan",
    //     email: "fake@mail.com",
    //   }],
    //   vendor_evaluation: "none",
    //   created_by: "Johnny",
    //   created_date: "31/01/2000",
    // };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.vendorService.addVendors(data)
      .subscribe((data) => {
        console.log(data)
        this.vendorService.vendorList.push(this.testEntry);
      });
    this._location.back();
  }
}

