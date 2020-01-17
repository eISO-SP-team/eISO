import { Injectable, EventEmitter } from '@angular/core';
import { Vendor } from "../model/vendor.model";
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  vendorSubject: BehaviorSubject<Vendor[]>;

  selectedVendornService: Vendor;

  vendorList: Vendor[] = [
    // new Vendor(1, "MacDonalds", "Pending", "Food", "TS2951", "DK", "Singapore", "892231", "", "", "Mr", "Ong", "Yi", "Kang", "ongyikang@mail.com", "87654321", "", "87654320",""),
    // new Vendor(2, "KFC", "Approved", "Food", "TS2951", "DK", "Singapore", "892231", "", "", "Mr", "Ong", "Yi", "Kang", "ongyikang@mail.com", "87654321", "", "87654320",""),
  ];


  constructor(public http: HttpClient) {
    this.vendorSubject = new BehaviorSubject<Vendor[]>(this.vendorList);
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
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor', vendors, {
    });
  }

  loadVendors() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor');
  }

  deleteVendor(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/vendor/' + enquiryId)
  }
}

