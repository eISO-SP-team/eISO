import { Injectable, EventEmitter } from '@angular/core';
import { Vendor } from "../model/vendor.model";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  evalData: any;

  evalList: any = [];

  vendorSubject: BehaviorSubject<any>;

  selectedVendornService: any;

  vendorList: any;

  constructor(public http: HttpClient) {
    this.vendorSubject = new BehaviorSubject<any>(this.vendorList);
  }

  // addVendor(newVendorInfo: Vendor) {
  //   return new Promise(resolve => {
  //     console.log("Retrieved enquiry");
  //     console.log(newVendorInfo);
  //     this.vendorList.unshift(newVendorInfo);
  //     console.log(this.vendorList);
  //     //basically, you update this listener with the new list, 
  //     //anyone that is subscribing to the enquiry will get the latest list
  //     this.vendorSubject.next(this.vendorList);

  //     console.log("triggered behaviour subject");
  //     resolve(true);
  //   });

  // };

  getVendorListener() {
    return this.vendorSubject.asObservable();
  }

  addVendors(vendors) {
    this.vendorList.unshift(vendors);
    this.vendorSubject.next(this.vendorList);
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor', vendors, {
    });
  }

  updateVendors(vendor) {
    this.vendorList.unshift(vendor);
    this.vendorSubject.next(this.vendorList);
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + this.selectedVendornService.id, vendor, {
    });
  }

  loadVendors() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor');
  }

  deleteVendor(enquiryId) {
    //console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId)
  }
}

