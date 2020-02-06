import { Component, OnInit } from '@angular/core';
import { Salesorder } from "../shared/model/salesorder.model";
import { SalesorderService } from "../shared/service/salesorder.service";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Message } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-salesorder-list',
  templateUrl: './salesorder-list.component.html',
  styleUrls: ['./salesorder-list.component.css']
})
export class SalesorderListComponent implements OnInit {
  msgs: Message[] = [];
  salesOrderList: any;

  salesOrderListPending = [];
  salesOrderListPending2: any;
  salesOrderListCompleted = [];
  salesOrderListCompleted2: any;
  selectedValues: Salesorder[] = [];

  selectedSalesOrder: Salesorder;

  selectSalesOrder: Salesorder[];

  salesOrderTest: any;

  constructor(public salesOrderService: SalesorderService, public router: Router, private confirmationservice: ConfirmationService) {
    this.salesOrderService.getSalesOrderListener()
      .subscribe(newList => {
        // console.log("listener triggered");
        // console.log(newList);
        //listens the listener in the service, whenever the code 
        // this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.salesOrderList = newList;
        this.salesOrderTest = this.salesOrderService.loadSalesorder().subscribe(responseData => {
          this.salesOrderService.salesOrderList = responseData.body;
          this.salesOrderList = this.salesOrderService.salesOrderList;
          // console.log(this.salesOrderList);
          for (let i = 0; i < this.salesOrderList.length; i++) {
            if (this.salesOrderList[i].status == "pending") {
              this.salesOrderListPending.push(this.salesOrderList[i]);
              this.salesOrderListPending2 = this.salesOrderListPending;
            } else {
              this.salesOrderListCompleted.push(this.salesOrderList[i]);
              this.salesOrderListCompleted2 = this.salesOrderListCompleted;
            }
          }
        });
      });

  }


  ngOnInit() {

  }

  viewEnquiryPending(salesOrderListPending) {
    console.log("In onViewDetail......" + JSON.stringify(salesOrderListPending));
    this.salesOrderService.selectedSalesOrderInService = salesOrderListPending;
    this.router.navigate(['/salesorderView', salesOrderListPending.id]);
  }

  viewEnquiryCompleted(salesOrderListCompleted) {
    console.log("In onViewDetail......" + JSON.stringify(salesOrderListCompleted));
    this.salesOrderService.selectedSalesOrderInService = salesOrderListCompleted;
    this.router.navigate(['/salesorderView', salesOrderListCompleted.id]);
  }

  deleteEnquiry(enquiry) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry));
    let index = -1;
    for (let i = 0; i < this.salesOrderList.length; i++) {
      if (this.salesOrderList[i].id == enquiry.id) {
        index = i;
        break;
      }
    }
    if (enquiry.status == "pending") {
      for (let i = 0; i < this.salesOrderListPending.length; i++) {
        if (this.salesOrderListPending[i].id == enquiry.id) {
          this.salesOrderListPending.splice(i, 1);
        }
      }

    } else {
      for (let i = 0; i < this.salesOrderList.length; i++) {
        if (this.salesOrderListCompleted[i].id == enquiry.id) {
          this.salesOrderListCompleted.splice(i, 1);
        }
      }
    }
    console.log(this.salesOrderList[index].id);
    this.salesOrderService.deleteSalesorder(this.salesOrderList[index].id).subscribe(() => {
      console.log("Deleted");
    });
    this.salesOrderList.splice(index, 1);
  }
  confirm(enquiry) {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteEnquiry(enquiry);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
}


