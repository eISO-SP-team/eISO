import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  deliverySubject: BehaviorSubject<any[]>;

  selectedDeliveryService: any;

  purchaseOrderList: any;

  deliveryList: any[] = [

  ];
  selectedPR: any;


  constructor(public http: HttpClient) {
    this.deliverySubject = new BehaviorSubject<any[]>(this.deliveryList);
  }


  getDeliveryListener() {
    return this.deliverySubject.asObservable();
  }


  addDeliveries(deliveries) {
    this.deliveryList.push(deliveries);
    this.deliverySubject.next(this.deliveryList)
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/delivery', deliveries, {
    });
  }

  loadDeliveries() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/delivery');
  }

  updateDeliveries( newInfo) {
    this.deliveryList.push(newInfo);
    this.deliverySubject.next(this.deliveryList)
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/delivery/' + this.selectedDeliveryService, newInfo)
  }

  deleteDeliveries(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/delivery/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/delivery/' + enquiryId)
  }
}

