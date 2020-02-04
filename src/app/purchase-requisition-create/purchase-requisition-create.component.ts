import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PurchaserequisitionService } from "../shared/service/purchaserequisition.service";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem, ConfirmationService, Message } from 'primeng/api'

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
  testList: any;

  constructor(private confirmationService: ConfirmationService, public purchaseRequisitionService: PurchaserequisitionService, public vendorService: VendorService, public _location: Location) { }

  msgs: Message[] = [];

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
   
    this.testList = this.purchaseRequisitionService.loadPurchaserequisitions().subscribe(responseData => {
      this.purchaseRequisitionService.purchaserequisitionList = (<any>responseData).body;
      this.requisitionList = this.purchaseRequisitionService.purchaserequisitionList;
      this.maxCount = this.requisitionList.length;
    });

    this.supplierList = this.vendorService.loadVendors().subscribe(responseData => {
      this.vendorService.vendorList = (<any>responseData).body;
      this.supplierList = this.vendorService.vendorList;
      this.newList = [];

      for (let i = 0; i < this.supplierList.length; i++) {
        this.newList.push({ label: this.supplierList[i].vendor_name, value: this.supplierList[i].id });
      }
    });
    this.addRequisitionForm = new FormGroup({
      'supplier_id': new FormControl(null, [Validators.required]),
      'requestor': new FormControl(null, [Validators.required]),
      "description": new FormControl(null, [Validators.required]),
      "terms": new FormControl(null, [Validators.required]),
      "total": new FormControl(null, [Validators.required]),
      "currency": new FormControl(null, [Validators.required]),
    })
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            this.onAddEnquiry();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}


  onAddEnquiry() {
    this.testEntry = {
      "currency": this.addRequisitionForm.value.currency,
      "description": this.addRequisitionForm.value.description,
      "pr_date": this.myDate,
      "pr_number": this.maxCount + 1,
      "requester": this.addRequisitionForm.value.requestor,
      "requisition_id": this.maxCount + 1,
      "status": "pending",
      "supplier_id": this.addRequisitionForm.value.supplier_id,
      "terms": this.addRequisitionForm.value.terms,
      "total": this.addRequisitionForm.value.total,
      "uploaded_date": this.myDate,
      "uploaded_by": "Jack",
      "created_by": "Jack",
      "created_date": this.myDate,
    };
    // console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.purchaseRequisitionService.addPurchaserequisition(data)
      .subscribe((data) => {
        // console.log(data)
        this.purchaseRequisitionService.purchaserequisitionList.push(this.testEntry);
      });
    this._location.back();
  }
}
