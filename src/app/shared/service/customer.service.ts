import { Injectable, EventEmitter } from '@angular/core';
import { Customer } from "../model/customer.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerSubject: BehaviorSubject<any[]>;

  selectedCustomerInService: any;

  customerList: any;


  constructor(public http: HttpClient) {
    this.customerSubject = new BehaviorSubject<any[]>(this.customerList);
  }

  addCustomer(newCustomerInfo: Customer) {
    return new Promise(resolve => {
       console.log("Retrieved enquiry");
    console.log(newCustomerInfo);
    this.customerList.unshift(newCustomerInfo);
    console.log(this.customerList);
    //basically, you update this listener with the new list, 
    //anyone that is subscribing to the enquiry will get the latest list
    this.customerSubject.next(this.customerList);

    console.log("triggered behaviour subject");
    resolve(true);
    });

  };

  getCustomerListener() {
    return this.customerSubject.asObservable();
  }

  addCustomers(customers) {
    console.log("before: "+this.customerList);
    this.customerList.unshift(JSON.parse(customers));
    console.log("before: "+this.customerList);
    //basically, you update this listener with the new list, 
    //anyone that is subscribing to the enquiry will get the latest list
    this.customerSubject.next(this.customerList);
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer', customers, {
    
  });

 
  }

  loadCustomers():Observable<any> {
    return this.http.get<Customer[]>('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/customer');
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
