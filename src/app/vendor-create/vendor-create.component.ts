import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Vendor } from "../shared/model/vendor.model";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';

interface Type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class vendorCreateComponent implements OnInit {

  type: Type[];

  selectedType: Type;

  addVendorForm: FormGroup;

  items: MenuItem[];

  activeIndex: number = 0;
  
  constructor(public vendorService: VendorService, public _location: Location) {
    this.type = [
      { name: 'Approved', value: 'Approved' },
      { name: 'Pending', value: 'Pending' },
    ];
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

  onAddEnquiry() {
    this.vendorService.addVendor(new Vendor(
      0,
      this.addVendorForm.value.name,
      this.addVendorForm.value.type,
      this.addVendorForm.value.products,
      this.addVendorForm.value.taxId,
      this.addVendorForm.value.services,
      this.addVendorForm.value.country,
      this.addVendorForm.value.zipcode,
      this.addVendorForm.value.address1,
      this.addVendorForm.value.address2,
      this.addVendorForm.value.prefix,
      this.addVendorForm.value.firstName,
      this.addVendorForm.value.middleName,
      this.addVendorForm.value.lastName,
      this.addVendorForm.value.email,
      this.addVendorForm.value.phoneNo,
      this.addVendorForm.value.extension,
      this.addVendorForm.value.mobileNo,
      this.addVendorForm.value.fax,
    ));
    this._location.back();
  }
}

