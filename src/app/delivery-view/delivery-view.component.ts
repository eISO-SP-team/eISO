import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DeliveryService } from "../shared/service/delivery.service";
import { PurchaseorderService } from "../shared/service/purchaseorder.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from '../shared/service/file-upload.service';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.css']
})
export class DeliveryViewComponent implements OnInit {

  uploadedFiles: any[] = [];

  msgs: Message[] = [];

  selectedCustomer: any;

  addDeliveryForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  test: any;

  purchaseOrderList = [];

  newList: SelectItem[];

  processControlList: any;

  maxCount: any;

  constructor(public fileUploadService: FileUploadService, public purchaseOrderService: PurchaseorderService, public deliveryService: DeliveryService, public _location: Location, private confirmationservice: ConfirmationService) {
    
  }
  
    newDelivery_date = this.deliveryService.selectedDeliveryService.dr_date;
    newLocation = this.deliveryService.selectedDeliveryService.location;
    newRemarks = this.deliveryService.selectedDeliveryService.remarks;
    newReceived_by = this.deliveryService.selectedDeliveryService.received_by;
    newPo_number = this.deliveryService.selectedDeliveryService.po_number;
    newDr_number = this.deliveryService.selectedDeliveryService.dr_number;

  ngOnInit() {

    this.test = this.purchaseOrderService.loadPurchaseorders().subscribe(responseData => {
      this.purchaseOrderService.purchaseorderList = (<any>responseData).body;
      for (let i = 0; i < this.purchaseOrderService.purchaseorderList.length; i++)
        if (this.purchaseOrderService.purchaseorderList[i].purchase_id == this.purchaseOrderService.selectedPR) {
          console.log(this.purchaseOrderService.purchaseorderList[i].purchase_id);
          console.log(this.purchaseOrderService.selectedPR);
          this.purchaseOrderList.push(this.purchaseOrderService.purchaseorderList[i]);
        }
      this.newList = [];
      for (let i = 0; i < this.purchaseOrderList.length; i++) {
        console.log(this.purchaseOrderList[i].remarks);
        this.newList.push({ label: this.purchaseOrderList[i].remarks, value: this.purchaseOrderList[i].id });
      }
    });

    this.addDeliveryForm = new FormGroup({
      'delivery_date': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      "remarks": new FormControl(null, [Validators.required]),
      "received_by": new FormControl(null, [Validators.required]),
      "po_number": new FormControl(null, [Validators.required]),
      "dr_number": new FormControl(null, [Validators.required]),
    })
  }

  onAddEnquiry() {
    this.testEntry = {
      "po_number": this.addDeliveryForm.value.po_number,
      "dr_number": this.addDeliveryForm.value.dr_number,
      'dr_date': this.addDeliveryForm.value.delivery_date,
      'location': this.addDeliveryForm.value.location,
      "remarks": this.addDeliveryForm.value.remarks,
      "received_by": this.addDeliveryForm.value.received_by,
      "status": "Pending",
    };

    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.deliveryService.updateDeliveries(data)
      .subscribe((data) => {
        console.log(data)
        this.deliveryService.deliveryList.push(this.testEntry);
      });

    this._location.back();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(file);
      this.fileUploadService.uploadFile(file).subscribe((result) => {
        console.log((<any>result).body);
      })
    }
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

