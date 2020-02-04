import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PurchaserequisitionService } from "../shared/service/purchaserequisition.service";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'

interface supplier {
  name: string;
  value: string;
}

@Component({
  selector: 'app-purchase-requisition-create',
  templateUrl: './purchase-requisition-create.component.html',
  styleUrls: ['./purchase-requisition-create.component.css']
})
export class PurchaseRequisitionCreateComponent implements OnInit {

  constructor(public purchaseRequisitionService: PurchaserequisitionService, public vendorService: VendorService, public _location: Location) { }

  supplier: supplier[];

  addRequisitionForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  supplierList: any;

  value: Date;

  newList: SelectItem[];

  requisitionList: any;

  maxCount: any;

  ngOnInit() {
    this.supplierList = this.vendorService.loadVendors().subscribe(responseData => {
      this.vendorService.vendorList = (<any>responseData).body;
      this.supplierList = this.vendorService.vendorList;
      this.newList = [];
      for (let i = 0; i < this.requisitionList.length; i++) {
        this.newList.push({ label: this.supplierList[i].vendor_name, value: this.supplierList[i].supplier_id });
      }
    });
  }

}
