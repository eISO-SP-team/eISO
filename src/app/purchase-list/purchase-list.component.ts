import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseorderService } from "../shared/service/purchaseorder.service";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchaseOrderList =[];
  index: number;

  constructor(private confirmationservice: ConfirmationService, public router: Router, public purchaseOrderService: PurchaseorderService) {
    this.purchaseOrderService.getPurchaseorderListener().subscribe(() => {
      this.purchaseOrderService.loadPurchaseorders().subscribe((responseData) => {
        this.purchaseOrderService.purchaseorderList = (<any>responseData).body;
        for (let i = 0; i < this.purchaseOrderService.purchaseorderList.length; i++)
          if (this.purchaseOrderService.purchaseorderList[i].purchase_id == this.purchaseOrderService.selectedPR) {
            //console.log(this.purchaseOrderService.purchaseorderList[i].purchase_id);
            //console.log(this.purchaseOrderService.selectedPR);
            this.purchaseOrderList.push(this.purchaseOrderService.purchaseorderList[i]);
          }
      })
    })
  }

  ngOnInit() {
  }

  viewEnquiry(enquiry) {
    //console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.purchaseOrderService.selectedPurchaseorderService = enquiry;
    this.router.navigate(['/poView', enquiry.id]);
  }

  deleteEnquiry(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.purchaseOrderService.deletePurchaseorder(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.purchaseOrderList.length; i++) {
        if (this.purchaseOrderList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.purchaseOrderList.splice(this.index, 1);
      //console.log('Vendor with id: ' + enquiry.id + ' has been deleted');
    });

  }

  confirm(enquiry) {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteEnquiry(enquiry);
      },
      reject: () => {
      }
    })
  }

}
