import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../shared/service/delivery.service";
import { ConfirmationService, Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveryList: any;

  deliveryTest: any;
  index: number;

  constructor(public deliveryService: DeliveryService, public router: Router, private confirmationservice: ConfirmationService) {
    this.deliveryService.getDeliveryListener()
      .subscribe(newList => {
        this.deliveryList = newList;
        this.deliveryTest = this.deliveryService.loadDeliveries().subscribe(responseData => {
          this.deliveryService.deliveryList = (<any>responseData).body;
          for (let i = 0; i < this.deliveryService.deliveryList.length; i++)
            if (this.deliveryService.deliveryList[i].purchase_id == this.deliveryService.selectedPR) {
              console.log(this.deliveryService.deliveryList[i].purchase_id);
              console.log(this.deliveryService.selectedPR);
              this.deliveryList.push(this.deliveryService.deliveryList[i]);
            }
        });
      });

  }

  ngOnInit() {
  }


  viewEnquiry(enquiry) {
    console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.deliveryService.selectedDeliveryService = enquiry;
    this.router.navigate(['/doView', enquiry.id]);
  }

  deleteEnquiry(enquiry) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.deliveryService.deleteDeliveries(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.deliveryList.length; i++) {
        if (this.deliveryList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.deliveryList.splice(this.index, 1);
      console.log('Vendor with id: ' + enquiry.id + ' has been deleted');
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
