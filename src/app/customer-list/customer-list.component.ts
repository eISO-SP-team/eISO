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

  items: MenuItem[];

  cols: any[];

  constructor(private customerService: CustomerService, private messageService: MessageService, public router: Router, ) {

    //this.quotationList = this.quotationService.quotationList;
    this.customerService.getCustomerListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.customerList = newList;
        console.log(newList);
      });

  }

  ngOnInit() {


    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewEnquiry(this.selectedCustomer) },
      // { label: 'Delete', icon: 'pi pi-times', command: (event) => alert(delete this.selectedQuotation) }
      // { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedQuotation) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteEnquiry(this.selectedCustomer) }
    ];



    this.cols = [
      { field: 'quotation_refNo', header: 'ENQ No.' },
      { field: 'quotation_prospectName', header: 'Customer Name' },
      { field: 'quotation_subPerson', header: 'Contact Person' },
      { field: 'quotation_email', header: 'Email' },
      { field: 'quotation_description', header: 'Description' },
      { field: 'status', header: 'Status' },
    ];

  }

  selectQuotation() {
    
  }

  viewEnquiry(customerList: Customer) {
    console.log("In onViewDetail......" + JSON.stringify(customerList));
    this.customerService.selectedCustomerInService = customerList;
    this.router.navigate(['/customerView', customerList.customer_refNo]);
  }

  deleteEnquiry(enquiry: Customer) {
    let index = -1;
    for (let i = 0; i < this.customerList.length; i++) {
      if (this.customerList[i].customer_refNo == enquiry.customer_refNo) {
        index = i;
        break;
      }
    }
    this.customerList.splice(index, 1);
  }
}

