import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DeliveryService } from "../shared/service/delivery.service";
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
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.css']
})
export class DeliveryCreateComponent implements OnInit {

  msgs: Message[] = [];

  customer: cust[];

  prefix: Type[];

  selectedCustomer: any;

  addDeliveryForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  newList: SelectItem[];

  processControlList: any;

  maxCount: any;

  constructor(public purchaseRequisitionService: PurchaserequisitionService, public deliveryService: DeliveryService, public _location: Location, private confirmationservice: ConfirmationService) {

  }

  ngOnInit() {
    this.addDeliveryForm = new FormGroup({
      'delivery_date': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      "remarks": new FormControl(null, [Validators.required]),
      "received_by": new FormControl(null, [Validators.required]),
    })
  }

  onAddEnquiry() {
    this.testEntry = {
      'delivery_date': this.addDeliveryForm.value.delivery_date,
      'location': this.addDeliveryForm.value.location,
      "remarks": this.addDeliveryForm.value.remarks,
      "received_by": this.addDeliveryForm.value.received_by,
    };

    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.deliveryService.addDeliveries(data)
      .subscribe((data) => {
        console.log(data)
        this.deliveryService.deliveryList.push(this.testEntry);
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
