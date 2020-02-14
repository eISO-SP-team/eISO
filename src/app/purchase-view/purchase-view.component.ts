import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PurchaseorderService } from "../shared/service/purchaseorder.service";
import { PurchaserequisitionService } from "../shared/service/purchaserequisition.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from '../shared/service/file-upload.service';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {

  newSupplier_id = this.PurchaseOrderService.selectedPurchaseorderService.supplier_id;
  newPurchase_id = this.PurchaseOrderService.selectedPurchaseorderService.purchase_id;
  newPo_number = this.PurchaseOrderService.selectedPurchaseorderService.po_number;
  newLocation = this.PurchaseOrderService.selectedPurchaseorderService.location;
  newEta = this.PurchaseOrderService.selectedPurchaseorderService.eta;
  newRemarks = this.PurchaseOrderService.selectedPurchaseorderService.remarks;
  newStatus = this.PurchaseOrderService.selectedPurchaseorderService.status;

  selectedPR: any;

  msgs: Message[] = [];

  selectedCustomer: any;

  addPurchaseForm: FormGroup;

  testEntry: any;

  uploadedFiles: any[] = [];

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  newList: SelectItem[];

  processControlList: any;

  maxCount: any;

  selectedVendor: any;

  constructor(public fileUploadService: FileUploadService, public purchaseRequisitionService: PurchaserequisitionService, public PurchaseOrderService: PurchaseorderService, public _location: Location, private confirmationservice: ConfirmationService) {
    this.selectedPR = this.purchaseRequisitionService.selectedPurchaserequisitionService.id;
    this.selectedVendor = this.purchaseRequisitionService.selectedPurchaserequisitionService.supplier_id;
  }

  ngOnInit() {
    this.addPurchaseForm = new FormGroup({
      "supplier_id": new FormControl(null, [Validators.required]),
      // PR_No.
      'purchase_id': new FormControl(null, [Validators.required]),
      "po_number": new FormControl(null, [Validators.required]),
      "location": new FormControl(null, [Validators.required]),
      "eta": new FormControl(null, [Validators.required]),
      "remarks": new FormControl(null, [Validators.required]),
      "status": new FormControl(null, [Validators.required]),
    })
  }

  onAddEnquiry() {
    this.testEntry = {
      "purchase_id": this.selectedPR,
      "po_number": this.addPurchaseForm.value.po_number,
      "po_date": this.myDate,
      "pr_number": this.purchaseRequisitionService.selectedPurchaserequisitionService.id,
      "supplier_id": this.selectedVendor,
      "location": this.addPurchaseForm.value.location,
      "eta": this.addPurchaseForm.value.eta,
      "remarks": this.addPurchaseForm.value.remarks,
      "status": this.addPurchaseForm.value.status,
      "created_by": "Jack",
      "created_date": this.myDate,
      "uploaded_by": "Jack",
      "uploaded_date": this.myDate,
    };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.PurchaseOrderService.updatePurchaseorders(data)
      .subscribe((data) => {
        console.log(data)
        this.PurchaseOrderService.purchaseorderList.push(this.testEntry);
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
