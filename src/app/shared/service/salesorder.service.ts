import { Injectable } from '@angular/core';
import { Salesorder } from "../model/salesorder.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesorderService {

  salesOrderSubject: BehaviorSubject<Salesorder[]>;

  selectedSalesOrderInService: Salesorder;

  salesOrderList: Salesorder[] = [
    new Salesorder(1, "Pending", 1, "Mr Benedict", "31/01/2000", "Buy Bricks", "Singapore", "Mr John", "john@mail.com", "1000", "200"),
    new Salesorder(2, "Completed", 2, "Mr Howl", "31/02/2000", "Buy Wood", "Singapore", "Mr Ron", "ron@mail.com", "2000", "500"),
    new Salesorder(3, "Pending", 3, "Mr Snake", "31/03/2000", "Buy Soil", "Singapore", "Mr Jacon", "jacob@mail.com", "3000", "400"),
    new Salesorder(2, "Completed", 2, "Mr Smoke", "31/02/2000", "Buy Wood", "Malaysia", "Mr Bat", "ron@mail.com", "2000", "500"),
  ];


  constructor() {
    this.salesOrderSubject = new BehaviorSubject<Salesorder[]>(this.salesOrderList);
  }

  addSalesOrder(newSalesOrderInfo: Salesorder) {
    return new Promise(resolve => {
      console.log("Retrieved enquiry");
      console.log(newSalesOrderInfo);
      this.salesOrderList.unshift(newSalesOrderInfo);
      console.log(this.salesOrderList);
      //basically, you update this listener with the new list, 
      //anyone that is subscribing to the enquiry will get the latest list
      this.salesOrderSubject.next(this.salesOrderList);

      console.log("triggered behaviour subject");
      resolve(true);
    });

  };

  getSalesOrderListener() {
    return this.salesOrderSubject.asObservable();
  }
}
