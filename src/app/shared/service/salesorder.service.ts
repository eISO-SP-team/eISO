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

  getSalesOrderListener() {
    return this.salesOrderSubject.asObservable();
  }

  addSalesorder(SalesOrder) {
    this.salesOrderList.unshift(SalesOrder);
    this.salesOrderSubject.next(this.salesOrderList);
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales', SalesOrder, {
    });
  }

  loadSalesorder(): Observable<any> {
    return this.http.get<any>('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales');
  }

  updateSalesorder(enquiryId, newInfo) {
    this.salesOrderList.push(newInfo);
    this.salesOrderSubject.next(this.salesOrderList);
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId, newInfo)
  }

  deleteSalesorder(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/sales/' + enquiryId)
  }
}
