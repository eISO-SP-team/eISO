import { Component, OnInit } from '@angular/core';
import { Vendor } from "../shared/model/vendor.model";
import { VendorService } from "../shared/service/vendor.service";
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class vendorListComponent implements OnInit {

  vendorList: Vendor[] = [];

  vendorListPending: Vendor[] = [];

  vendorListApproved: Vendor[] = [];

  selectedValues: Vendor[] = [];

  selectedVendor: Vendor;

  selectVendors: Vendor[];

  items: MenuItem[];
  items2: MenuItem[];

  cols: any[];

  constructor(private vendorService: VendorService, public router: Router, ) {

    this.vendorService.getVendorListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.vendorList = newList;
        for (let i = 0; i < this.vendorList.length; i++) {
          if (this.vendorList[i].vendor_type=="Pending") {
            this.vendorListPending.push(this.vendorList[i])
          } else {
            this.vendorListApproved.push(this.vendorList[i])
          }
        }
        console.log(newList);
      });

  }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewEnquiry(this.selectedVendor) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteEnquiry(this.selectedVendor) }
    ];

  }

  filterVendorPending(vendor: Vendor) {
    return vendor.vendor_type == "Pending"
  }

  filterVendorApproved(vendor: Vendor) {
    return vendor.vendor_type == "Approved"
  }

  viewEnquiry(vendorList: Vendor) {
    console.log("In onViewDetail......" + JSON.stringify(vendorList));
    this.vendorService.selectedVendornService = vendorList;
    this.router.navigate(['/vendorView', vendorList.vendor_refNo]);
  }

  deleteEnquiry(enquiry: Vendor) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry));
    let index = -1;
    for (let i = 0; i < this.vendorList.length; i++) {
      if (this.vendorList[i].vendor_refNo == enquiry.vendor_refNo) {
        index = i;
        break;
      }
    }
    this.vendorList.splice(index, 1);
  }
}
