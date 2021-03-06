import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {

  purchaseorderSubject: BehaviorSubject<any[]>;

  selectedPurchaseorderService: any;

  purchaseorderList: any;
  selectedPR: any;


  constructor(public http: HttpClient) {
    this.purchaseorderSubject = new BehaviorSubject<any[]>(this.purchaseorderList);
  }


  getPurchaseorderListener() {
    return this.purchaseorderSubject.asObservable();
  }

  addPurchaseorders(purchaseorders) {
    this.purchaseorderList.push(purchaseorders);
    this.purchaseorderSubject.next(this.purchaseorderList);
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-order', purchaseorders, {
    });
  }

  loadPurchaseorders() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-order');
  }

  updatePurchaseorders(newInfo) {
    this.purchaseorderList.push(newInfo);
    this.purchaseorderSubject.next(this.purchaseorderList);
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-order/' + this.selectedPurchaseorderService.id, newInfo)
  }

  deletePurchaseorder(enquiryId) {
    //console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-order/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-order/' + enquiryId)
  }
}

