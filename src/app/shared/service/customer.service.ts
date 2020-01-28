import { Injectable, EventEmitter } from '@angular/core';
import { Customer } from "../model/customer.model";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerSubject: BehaviorSubject<Customer[]>;

  selectedCustomerInService: any;

  customerList: Customer[] = [
    // new Customer(1, "Skubbs", "Customer", "Singapore", "Singapore", "Kaki Bukit", "Bulding 24", "924123", "Mr Benedict"),
    // new Customer(2, "ST Engineering", "Prospect", "Singapore", "Singapore", "Jurong East", "Bulding 99", "213123", "Mr Jia Wee"),
    // new Customer(3, "Associates Consultant", "Prospect", "Singapore", "Singapore", "Somewhere", "Bulding 34", "864123", "Mr Andre"),
  ];


  constructor(public http: HttpClient) {
    this.customerSubject = new BehaviorSubject<Customer[]>(this.customerList);
  }

  // addCustomer(newCustomerInfo: Customer) {
  //   return new Promise(resolve => {
  //      console.log("Retrieved enquiry");
  //   console.log(newCustomerInfo);
  //   this.customerList.unshift(newCustomerInfo);
  //   console.log(this.customerList);
  //   //basically, you update this listener with the new list, 
  //   //anyone that is subscribing to the enquiry will get the latest list
  //   this.customerSubject.next(this.customerList);

  //   console.log("triggered behaviour subject");
  //   resolve(true);
  //   });

  // };

  getCustomerListener() {
    return this.customerSubject.asObservable();
  }

  addCustomers(customers) {
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer', customers, {
    });
  }

  loadCustomers() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer');
  }

  updateCustomer(enquiryId, updateInfo) {
    console.log(this.selectedCustomerInService.id);
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer/' + enquiryId, updateInfo)
  }

  deleteCustomer(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer/' + enquiryId)
  }
}
