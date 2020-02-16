import { Component, OnInit } from '@angular/core';
import { Customer } from "../shared/model/customer.model";
import { CustomerService } from "../shared/service/customer.service";
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  msgs: Message[] = [];

  customerList: any;

  selectedCustomer: Customer;

  selectCustomers: Customer[];

  testList: any;

  customersTest: any;

  rows = this.customerService.rows;

  index: any;

  confirmDelete: boolean;

  constructor(public customerService: CustomerService, public router: Router, private confirmationservice: ConfirmationService) {

    //this.quotationList = this.quotationService.quotationList;
    this.customerService.getCustomerListener()
      .subscribe(newList => {
        this.customerList = newList;
        this.customersTest = this.customerService.loadCustomers().subscribe(responseData => {
          this.customerService.customerList = responseData.body;
          this.customerList = this.customerService.customerList;
        });
      });

  }

  ngOnInit() {

  }

  viewEnquiry(selectedCustomer) {
    // console.log("In onViewDetail......" + JSON.stringify(selectedCustomer));
    this.customerService.selectedCustomerInService = selectedCustomer;
    this.router.navigate(['/customerView', selectedCustomer.id]);
  }

  deleteEnquiry(enquiry) {
    // console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.customerService.deleteCustomer(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.customerList.length; i++) {
        if (this.customerList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.customerList.splice(this.index, 1);
      // console.log('Vendor with id: ' + enquiry.id + ' has been deleted');
    });

  }

  viewMore() {
    this.customerService.rows = 100;
    this.router.navigate(['/customerList']);
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
    })
  }
}

