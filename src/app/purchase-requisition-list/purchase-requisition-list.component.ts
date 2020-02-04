import { Component, OnInit } from '@angular/core';
import { Customer } from "../shared/model/customer.model";
import { PurchaserequisitionService } from "../shared/service/purchaserequisition.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchase-requisition-list',
  templateUrl: './purchase-requisition-list.component.html',
  styleUrls: ['./purchase-requisition-list.component.css']
})
export class PurchaseRequisitionListComponent implements OnInit {

  requisitionList: any;

  testList: any;

  customersTest: any;

  index: any;

  confirmDelete: boolean;

  constructor(public purchaseRequisitionService: PurchaserequisitionService, public router: Router, ) {
    this.purchaseRequisitionService.getRequisitionListener()
      .subscribe(newList => {
        this.requisitionList = newList;
      });
  }
  ngOnInit() {
    this.testList = this.purchaseRequisitionService.loadPurchaserequisitions().subscribe(responseData => {
      this.purchaseRequisitionService.purchaserequisitionList = (<any>responseData).body;
      this.requisitionList = this.purchaseRequisitionService.purchaserequisitionList;
    });
  }

  viewEnquiry(requisitionList: any) {
    console.log("In onViewDetail......" + JSON.stringify(requisitionList));
    this.purchaseRequisitionService.selectedPurchaserequisitionService = requisitionList;
    this.router.navigate(['/requisitionView', requisitionList.id]);
  }

  deleteEnquiry(enquiry: any) {
    this.purchaseRequisitionService.deletePurchaserequisition(enquiry.id).subscribe(() => {
      console.log("Delete this enquiry......" + JSON.stringify(enquiry));
      let index = -1;
      for (let i = 0; i < this.requisitionList.length; i++) {
        if (this.requisitionList[i].id == enquiry.id) {
          index = i;
          break;
        }
      }
      this.requisitionList.splice(index, 1);
    });
  }

}
