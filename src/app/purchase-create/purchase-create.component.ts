import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {PurchaseorderService} from "../shared/service/purchaseorder.service";
import { PurchaserequisitionService } from "../shared/service/purchaserequisition.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { ConfirmationService, Message } from 'primeng/api';

interface Type {
  name: string;
  value: string;
}

interface cust {
  name: string;
  value: string;
}

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {
  msgs: Message[] = [];

  customer: cust[];

  prefix: Type[];

  selectedCustomer: any;

  addPurchaseForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  newList: SelectItem[];

  processControlList: any;

  maxCount: any;

  constructor(public purchaseRequisitionService: PurchaserequisitionService, public PurchaseOrderService: PurchaseorderService, public _location: Location, private confirmationservice: ConfirmationService) {

  }

  ngOnInit() {
    this.addPurchaseForm = new FormGroup({
      "supplier_id": new FormControl(null, [Validators.required]),
      // PR_No.
      'purchase_id': new FormControl(null, [Validators.required]), 
      "location": new FormControl(null, [Validators.required]),
      "eta": new FormControl(null, [Validators.required]),
      "remarks": new FormControl(null, [Validators.required]),
      "status": new FormControl(null, [Validators.required]),
      
    })
  }


    onAddEnquiry() {
      this.testEntry = {
        'supplier_id': this.addPurchaseForm.value.supplier_id,
        'purchase_id': this.addPurchaseForm.value.purchase_id,
        "location": this.addPurchaseForm.value.location,
        "eta": this.addPurchaseForm.value.eta,
        "remarks": this.addPurchaseForm.value.remarks,
        "status": this.addPurchaseForm.value.status,
      };

    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.PurchaseOrderService.addPurchaseorders(data)
      .subscribe((data) => {
        console.log(data)
        this.PurchaseOrderService.purchaseorderList.push(this.testEntry);
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
