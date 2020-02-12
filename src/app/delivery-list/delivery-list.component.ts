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

  constructor(public deliveryService: DeliveryService, public router: Router, private confirmationservice: ConfirmationService) {
    this.deliveryService.getDeliveryListener()
      .subscribe(newList => {
        this.deliveryList = newList;
        this.deliveryTest = this.deliveryService.loadDeliveries().subscribe(responseData => {
          this.deliveryService.deliveryList = (<any>responseData).body;
          this.deliveryList = this.deliveryService.deliveryList;
        });
      });

  }

  ngOnInit() {
  }

}
