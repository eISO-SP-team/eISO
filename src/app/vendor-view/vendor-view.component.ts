import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VendorService } from "../shared/service/vendor.service";
import { DialogDisplayService } from "../shared/service/dialog-display.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

interface Type {
  lablel: string;
  value: string;
}

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.css']
})
export class vendorViewComponent implements OnInit {

  @Output() closeDisplay = new EventEmitter();

  addVendorForm: FormGroup;

  evaluationList: any;

  type: SelectItem[];

  prefix: SelectItem[];

  selectedType: Type;

  selectedPrefix: Type;

  activeIndex: number = 0;

  display: boolean = this.dialogDisplayService.display;

  testEntry: any;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(public vendorService: VendorService, public _location: Location, public router: Router, public dialogDisplayService: DialogDisplayService) {
    this.evaluationList = this.vendorService.selectedVendornService.vendor_evaluation;
    this.vendorService.evalList = this.vendorService.selectedVendornService.vendor_evaluation;
    //console.log(this.evaluationList);

    this.type = [
      { label: 'Approved', value: 'Pass' },
      { label: 'Pending', value: 'Fail' },
    ];

    this.prefix = [
      { label: 'Mr', value: 'Mr' },
      { label: 'Mrs', value: 'Mrs' },
      { label: 'Miss', value: 'Miss' },
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
  newPrefix = this.vendorService.selectedVendornService.vendor_contact[0].prefix;
  newFirstName = this.vendorService.selectedVendornService.vendor_contact[0].first_name;
  newMiddleName = this.vendorService.selectedVendornService.vendor_contact[0].middle_name;
  newLastName = this.vendorService.selectedVendornService.vendor_contact[0].last_name;
  newEmail = this.vendorService.selectedVendornService.vendor_contact[0].email;
  newPhoneNo = this.vendorService.selectedVendornService.vendor_contact[0].phone_number;
  newExtension = this.vendorService.selectedVendornService.vendor_contact[0].extension_number;
  newMobileNo = this.vendorService.selectedVendornService.vendor_contact[0].mobile;
  newFax = this.vendorService.selectedVendornService.vendor_contact[0].fax_number;

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

    this.vendorService.selectedVendornService.evalList = this.vendorService.selectedVendornService.vendor_evaluation;
  }
  onAddEnquiry() {
    this.testEntry = {
      vendor_code: this.vendorService.selectedVendornService.vendor_code,
      vendor_name: this.newName,
      vendor_type: this.newType,
      products: this.newProducts,
      tax_id: this.newTaxId,
      services: this.newServices,
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
      vendor_evaluation: this.evaluationList,
      created_by: "Johnny",
      created_date: this.vendorService.selectedVendornService.created_date,
    };
    //console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.vendorService.updateVendors(data)
      .subscribe((data) => {
        //console.log(data)
      });
    this._location.back();
  }

  showDialog() {
    this.dialogDisplayService.display = true;
  }


}
