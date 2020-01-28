import { Component, OnInit } from '@angular/core';
import { Customer } from "../shared/model/customer.model";
import { CustomerService } from "../shared/service/customer.service";
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  customerList: Customer[] = [
  ];

  selectedCustomer: Customer;

  selectCustomers: Customer[];

  testList: any;

  customersTest: any;

  index: any;

  confirmDelete: boolean;

  constructor(private customerService: CustomerService, private messageService: MessageService, public router: Router, ) {

    //this.quotationList = this.quotationService.quotationList;
    this.customerService.getCustomerListener()
      .subscribe(newList => {
        // console.log("listener triggered");
        // console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.customerList = newList;
        // console.log(newList);
      });

  }

  ngOnInit() {
    this.customersTest = this.customerService.loadCustomers().subscribe(responseData => {
      this.testList = responseData;
      this.testList = this.testList.body;      
      // console.log(JSON.stringify(this.testList));
    });
  }

  selectQuotation() {

  }

  viewEnquiry(selectedCustomer) {
    console.log("In onViewDetail......" + JSON.stringify(selectedCustomer));
    this.customerService.selectedCustomerInService = selectedCustomer;
    this.router.navigate(['/customerView', selectedCustomer.id]);
  }

  deleteEnquiry(enquiry) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.customerService.deleteCustomer(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.testList.length; i++) {
        if (this.testList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.testList.splice(this.index, 1);
      console.log('Vendor with id: ' + enquiry.id + ' has been deleted');
  });

}
}

