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

  constructor(public http: HttpClient) {
    this.salesOrderSubject = new BehaviorSubject<any>(this.salesOrderList);
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
