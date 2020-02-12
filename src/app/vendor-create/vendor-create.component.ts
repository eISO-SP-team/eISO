import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Vendor } from "../shared/model/vendor.model";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Message } from 'primeng/api';
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
  msgs: Message[] = [];

  type: Type[];

  prefix: Type[];

  selectedType: Type;

  selectedPrefix: Type;

  addVendorForm: FormGroup;

  items: MenuItem[];

  activeIndex: number = 0;

  testEntry: any;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(public vendorService: VendorService, public _location: Location, private confirmationservice: ConfirmationService ) {
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

  onAddEnquiry() {
    this.testEntry = {
      vendor_code: "12345",
      vendor_name: this.addVendorForm.value.name,
      vendor_type: this.addVendorForm.value.type.value,
      products: this.addVendorForm.value.products,
      tax_id: this.addVendorForm.value.taxId,
      vendor_address: {
        country: this.addVendorForm.value.country,
        address_1: this.addVendorForm.value.address1,
        address_2: this.addVendorForm.value.address2,
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
      created_date: "",
    };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.vendorService.addVendors(data)
      .subscribe((data) => {
        console.log(data)
        this.vendorService.vendorList.push(this.testEntry);
      });
    this._location.back();
  }
  confirm() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.onAddEnquiry();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
}

