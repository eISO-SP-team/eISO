import { Component, OnInit } from '@angular/core';
import { Vendor } from "../shared/model/vendor.model";
import { VendorService } from "../shared/service/vendor.service";
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class vendorListComponent implements OnInit {
  msgs: Message[] = [];

  vendorList: Vendor[] = [];

  vendorListPending: Vendor[] = [];

  vendorListApproved: Vendor[] = [];

  selectedVendor: Vendor;

  selectVendors: Vendor[];

  testList: any;

  vendorsTest: any;

  index: any;

  confirmDelete: boolean;

  constructor(public vendorService: VendorService, public router: Router,private confirmationservice: ConfirmationService ) {

    this.vendorService.getVendorListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        this.vendorsTest = this.vendorService.loadVendors().subscribe(responseData => {
          this.testList = (<any>responseData).body;
          this.vendorService.vendorList = this.testList;
          // console.log(JSON.stringify(this.testList));
        });
        // if (this.testList == undefined) {
        //   console.log("newList has nothing please fix");
        // } else {
        //   this.vendorList = newList;
        //   for (let i = 0; i < this.vendorList.length; i++) {
        //     if (this.vendorList[i].vendor_type == "Pending") {
        //       this.vendorListPending.push(this.vendorList[i])
        //     } else {
        //       this.vendorListApproved.push(this.vendorList[i])
        //     }
        //   }
        //   console.log(newList);
        // }

      });

  }

  ngOnInit() {
    // this.vendorsTest = this.vendorService.loadVendors().subscribe(responseData => {
    //   this.testList = responseData;
    //   this.testList = this.testList.body;
    //   // console.log(JSON.stringify(this.testList));
    // });
  }

  viewEnquiryPending(vendorListPending: any) {
    console.log("In onViewDetail......" + JSON.stringify(vendorListPending));
    this.vendorService.selectedVendornService = vendorListPending;
    this.router.navigate(['/vendorView', vendorListPending.id]);
  }
  viewEnquiryApproved(vendorListApproved: any) {
    console.log("In onViewDetail......" + JSON.stringify(vendorListApproved));
    this.vendorService.selectedVendornService = vendorListApproved;
    this.router.navigate(['/vendorView', vendorListApproved.id]);
  }

  deleteEnquiry(enquiry: any) {

    console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.vendorService.deleteVendor(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.testList.length; i++) {
        if (this.testList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.testList.splice(this.index, 1);
      console.log('Vendor with id: ' + enquiry.id + ' has been deleted');
    });

  }
  confirm(enquiry) {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteEnquiry(enquiry);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }


}

// deleteEnquiry(enquiry) {
//   console.log("Delete this enquiry......" + JSON.stringify(enquiry));
//   let index = -1;
//   for (let i = 0; i < this.vendorList.length; i++) {
//     if (this.vendorList[i].vendor_refNo == enquiry.vendor_refNo) {
//       index = i;
//       break;
//     }
//   }
//   this.vendorList.splice(index, 1);
// }
// }
