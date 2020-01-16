import { Component, OnInit } from '@angular/core';
import { Salesorder } from "../shared/model/salesorder.model";
import { SalesorderService } from "../shared/service/salesorder.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-salesorder-list',
  templateUrl: './salesorder-list.component.html',
  styleUrls: ['./salesorder-list.component.css']
})
export class SalesorderListComponent implements OnInit {

  salesOrderList: Salesorder[] = [];

  salesOrderListPending: Salesorder[] = [];

  salesOrderListCompleted: Salesorder[] = [];

  selectedValues: Salesorder[] = [];

  selectedSalesOrder: Salesorder;

  selectSalesOrder: Salesorder[];

  constructor(public salesOrderService: SalesorderService, public router: Router, ) {
    this.salesOrderService.getSalesOrderListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.salesOrderList = newList;
        for (let i = 0; i < this.salesOrderList.length; i++) {
          if (this.salesOrderList[i].salesorder_type == "Pending") {
            this.salesOrderListPending.push(this.salesOrderList[i])
          } else {
            this.salesOrderListCompleted.push(this.salesOrderList[i])
          }
        }
        console.log(newList);
      });

  }


  ngOnInit() {
  }

  viewEnquiryPending(salesOrderListPending: Salesorder) {
    console.log("In onViewDetail......" + JSON.stringify(salesOrderListPending));
    this.salesOrderService.selectedSalesOrderInService = salesOrderListPending;
    this.router.navigate(['/vendorView', this.salesOrderListPending[0].salesorder_refNo]);
  }
  viewEnquiryCompleted(salesOrderListCompleted: Salesorder) {
    console.log("In onViewDetail......" + JSON.stringify(salesOrderListCompleted));
    this.salesOrderService.selectedSalesOrderInService = salesOrderListCompleted;
    this.router.navigate(['/vendorView', salesOrderListCompleted.salesorder_refNo]);
  }

  deleteEnquiry(enquiry: Salesorder) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry));
    let index = -1;
    for (let i = 0; i < this.salesOrderList.length; i++) {
      if (this.salesOrderList[i].salesorder_refNo == enquiry.salesorder_refNo) {
        index = i;
        break;
      }
    }
    if (enquiry.salesorder_type == "Pending") {
      for (let i = 0; i < this.salesOrderList.length; i++) {
        if (this.salesOrderListPending[i].salesorder_refNo == enquiry.salesorder_refNo) {
          this.salesOrderListPending.splice(i, 1);
        }
      }

    } else {
      for (let i = 0; i < this.salesOrderList.length; i++) {
        if (this.salesOrderListCompleted[i].salesorder_refNo == enquiry.salesorder_refNo) {
          this.salesOrderListCompleted.splice(i, 1);
        }
      }
    }

    this.salesOrderList.splice(index, 1);
  }
}


