import { Injectable } from '@angular/core';
import { Salesorder } from "../model/salesorder.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalesorderService {

  salesOrderSubject: BehaviorSubject<any[]>;

  selectedSalesOrderInService: any;

  salesOrderList: any;

  salesOrderListPending: any;

  salesOrderListCompleted: any;

  // salesOrderList: Salesorder[] = [
  //   new Salesorder(1, "Pending", 1, "Mr Benedict", "31/01/2000", "Buy Bricks", "Singapore", "Mr John", "john@mail.com", "1000", "200"),
  //   new Salesorder(2, "Completed", 2, "Mr Howl", "31/02/2000", "Buy Wood", "Singapore", "Mr Ron", "ron@mail.com", "2000", "500"),
  //   new Salesorder(3, "Pending", 3, "Mr Snake", "31/03/2000", "Buy Soil", "Singapore", "Mr Jacon", "jacob@mail.com", "3000", "400"),
  //   new Salesorder(2, "Completed", 2, "Mr Smoke", "31/02/2000", "Buy Wood", "Malaysia", "Mr Bat", "ron@mail.com", "2000", "500"),
  // ];


  constructor(public http: HttpClient) {
    this.salesOrderSubject = new BehaviorSubject<any[]>(this.salesOrderList);
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

  addSalesorder(SalesOrder) {
    console.log("before: " + this.salesOrderList);
    this.salesOrderList.unshift(JSON.parse(SalesOrder));
    console.log("before: " + this.salesOrderList);
    //basically, you update this listener with the new list, 
    //anyone that is subscribing to the enquiry will get the latest list
    this.salesOrderSubject.next(this.salesOrderList);
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales', SalesOrder, {
    });
  }

  loadSalesorder(): Observable<any> {
    return this.http.get<any>('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales');
  }

  updateSalesorder(enquiryId, newInfo) {
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId, newInfo)
  }

  deleteSalesorder(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId)
  }
}
