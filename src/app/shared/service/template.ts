import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  vendorSubject: BehaviorSubject<any[]>;

  selectedVendorService: any;

  vendorList: any[] = [

  ];


  constructor(public http: HttpClient) {
    this.vendorSubject = new BehaviorSubject<any[]>(this.vendorList);
  }


  getVendorListener() {
    return this.vendorSubject.asObservable();
  }

  addVendors(vendors) {
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor', vendors, {
    });
  }

  loadVendors() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor');
  }

  updateVendors(enquiryId, newInfo) {
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId, newInfo)
  }

  deleteVendor(enquiryId) {
    //console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId)
  }
}

