import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PurchaserequisitionService {

 purchaserequisitionSubject: BehaviorSubject<any[]>;

  selectedPurchaserequisitionService: any;

  purchaserequisitionList: any;


  constructor(public http: HttpClient) {
    this.purchaserequisitionSubject = new BehaviorSubject<any[]>(this.purchaserequisitionList);
  }


  getRequisitionListener() {
    return this.purchaserequisitionSubject.asObservable();
  }

  addPurchaserequisition(purchaserequisitions) {
    return this.http.post('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-requisition', purchaserequisitions, {
    });
  }

  loadPurchaserequisitions() {
    return this.http.get('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-requisition');
  }

  updatePurchaserequisitions(enquiryId, newInfo) {
    return this.http.put('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-requisition/' + enquiryId, newInfo)
  }

  deletePurchaserequisition(enquiryId) {
    console.log('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-requisition/' + enquiryId);
    return this.http.delete('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/purchase-requisition/' + enquiryId)
  }
}

