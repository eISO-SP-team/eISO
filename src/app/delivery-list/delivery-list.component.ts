import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../shared/service/delivery.service";
import { PurchaseorderService } from "../shared/service/purchaseorder.service";
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  outputList: any = [];

  deliveryList: any = [];

  filteredDeliveryList = [];

  poNumberList = [];

  deliveryTest: any;

  newList: SelectItem[];

  index: number;

  getList: any = [];

  purchaseOrderList: any = [];

  constructor(public purchaseOrderService: PurchaseorderService, public deliveryService: DeliveryService, public router: Router, private confirmationservice: ConfirmationService) {
    this.deliveryService.getDeliveryListener().subscribe(() => {
      this.deliveryTest = this.deliveryService.loadDeliveries().subscribe(responseData => {
        this.outputList = (<any>responseData).body;
        console.log(this.outputList);
        for (let i = 0; i < this.outputList.length; i++) {
          if (this.outputList[i].po_number == this.purchaseOrderService.selectedPurchaseorderService.id) {
            this.deliveryList.push(this.outputList[i]);
            console.log(this.outputList[i]);
            console.log(this.purchaseOrderService.selectedPurchaseorderService);
          }
        }
      });
    });
  }

  ngOnInit() {

  }


  viewEnquiry(enquiry) {
    //console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.deliveryService.selectedDeliveryService = enquiry;
    this.router.navigate(['/doView', enquiry.id]);
  }

  deleteEnquiry(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.deliveryService.deleteDeliveries(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.deliveryList.length; i++) {
        if (this.deliveryList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.deliveryList.splice(this.index, 1);
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
