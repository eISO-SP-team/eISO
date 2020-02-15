import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuotationService } from "../shared/service/quotation.service";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { SelectItem, ConfirmationService } from 'primeng/api'
import { formatDate } from '@angular/common';
import { Router } from "@angular/router";

interface supplier {
  name: string;
  value: string;
}

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationViewComponent implements OnInit {

  addForm: FormGroup;

  newCompanyName = this.quotationService.selectedQuotationInService.subject;
  newTenderLocation = this.quotationService.selectedQuotationInService.tender_location;
  newTo = this.quotationService.selectedQuotationInService.supplier_id;
  newValidity = this.quotationService.selectedQuotationInService.validity;
  newAttention = this.quotationService.selectedQuotationInService.attention;
  newTotal = this.quotationService.selectedQuotationInService.total;
  newDeposit = this.quotationService.selectedQuotationInService.deposit;

  supplier: supplier[];

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  uploadedFiles: any[] = [];

  vendorList: any;

  activeIndex: number = 0;

  newList: SelectItem[];

  newList2: SelectItem[];

  newEdit: any;

  maxCount: any;

  quotationList: any;

  constructor(private router: Router, private confirmationservice: ConfirmationService, public quotationService: QuotationService, public vendorService: VendorService, public _location: Location) { }

  ngOnInit() {
    this.newList2 = [
      { label: "Pending", value: "Pending" },
      { label: "Approved", value: "Approved" }
    ]

    console.log(this.quotationService.selectedQuotationInService);
    this.vendorList = this.vendorService.loadVendors().subscribe(responseData => {
      this.vendorService.vendorList = responseData;
      this.vendorService.vendorList = this.vendorService.vendorList.body;
      this.vendorList = this.vendorService.vendorList;
      this.newList = [];
      for (let i = 0; i < this.vendorList.length; i++) {
        this.newList.push({ label: this.vendorList[i].vendor_name, value: this.vendorList[i].id });
      }
    });

    this.addForm = new FormGroup({
      'refNo': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'companyName': new FormControl(null, [Validators.required]),
      'tenderLocation': new FormControl(null, [Validators.required]),
      'to': new FormControl(null, [Validators.required]),
      'validity': new FormControl(null, [Validators.required]),
      'attention': new FormControl(null, [Validators.required]),
      'total': new FormControl(null, [Validators.required]),
      'deposit': new FormControl(null, [Validators.required]),
      'status': new FormControl(null),
    })
    this.addForm.disable();
  }

  toggleDisabled() {
    this.addForm.enable();
  }

  updateEdits() {
    this.newEdit = {
      "id": this.quotationService.selectedQuotationInService.id,
      "attention": this.newAttention,
      "closing_remarks": "xyz",
      "created_by": "Jack",
      "created_date": this.quotationService.selectedQuotationInService.created_date,
      "deposit": this.newDeposit,
      "opening_remarks": "abc",
      "quotation_date": this.quotationService.selectedQuotationInService.quotation_date,
      "quotation_id": this.quotationService.selectedQuotationInService.quotation_id,
      "quotation_number": this.quotationService.selectedQuotationInService.quotation_number,
      "status": this.newValidity,
      "subject": this.newCompanyName,
      "supplier_id": this.newTo,
      "tender_location": this.newTenderLocation,
      "total": this.newTotal,
      "updated_by": "Jack",
      "updated_date": this.myDate,
      "validity": this.newValidity,
      "quotation_details": {
        "total_price": 90,
        "quotation_id": "123",
        "approval": "approved",
        "quotation_line_id": "001",
        "type": "Docx",
        "created_by": "Jack",
        "reference_type": "abc",
        "prepared_by": "Jack",
        "file": "quotation.docx",
        "line_number": 1,
        "next_followup": "2019-11-26",
        "updated_by": "Jack",
        "reference_date": "2019-11-26",
        "created_date": "2019-11-26",
        "updated_date": "2019-11-26",
        "status": "Approved"
      }
    }
    var data = JSON.stringify(this.newEdit);
    this.quotationService.updateQuotation(this.quotationService.selectedQuotationInService.id, data)
      .subscribe((data) => {
        // console.log("Updated: " + data)
        this._location.back();
      });
  }

  approve() {
    this.quotationService.selectedQuotationInService.status = "approved";
    var data = JSON.stringify(this.quotationService.selectedQuotationInService);
    this.quotationService.updateQuotation(this.quotationService.selectedQuotationInService.id, data)
      .subscribe(() => {
        console.log("Updated: to approved")
        this.router.navigate(['/salesorderCreate']);
      });

  }

  notApprove() {
    this.quotationService.selectedQuotationInService.status = "not approved";
    var data = JSON.stringify(this.quotationService.selectedQuotationInService);
    this.quotationService.updateQuotation(this.quotationService.selectedQuotationInService.id, data)
      .subscribe(() => {
        console.log("Updated: to not approved")
        this.router.navigate(['/sales-module']);
      });

  }

  confirm() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.approve();
      },
      reject: () => {
      }
    });
  }

  confirm2() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.notApprove();
      },
      reject: () => {
      }
    });
  }
}
