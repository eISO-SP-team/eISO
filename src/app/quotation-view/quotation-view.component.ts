import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuotationService } from "../shared/service/quotation.service";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { formatDate } from '@angular/common';

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

  newEdit: any;

  maxCount: any;

  quotationList: any;

  constructor(public quotationService: QuotationService, public vendorService: VendorService, public _location: Location) { }

  ngOnInit() {
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

  // updateEdits() {
  //   let index = -1;
  //   for (let i = 0; i < this.quotationService.quotationList.length; i++) {
  //     if (this.quotationService.quotationList[i].quotation_refNo == this.quotationService.selectedQuotationInService.quotation_refNo) {
  //       index = i;
  //       console.log(JSON.stringify(this.quotationService.quotationList[index].quotation_title))
  //       break;
  //     }
  //   }
  //   console.log(JSON.stringify(this.quotationService.quotationList[index]))
  //   this.quotationService.quotationList[index].quotation_title = this.newTitle;
  //   this.quotationService.quotationList[index].quotation_subject = this.newCompanyName;
  //   this.quotationService.quotationList[index].quotation_tenderLocation = this.newTenderLocation;
  //   this.quotationService.quotationList[index].quotation_to = this.newTo;
  //   this.quotationService.quotationList[index].quotation_validity = this.newValidity;
  //   this.quotationService.quotationList[index].quotation_attention = this.newAttention;
  //   this.quotationService.quotationList[index].quotation_total = this.newTotal;
  //   this.quotationService.quotationList[index].quotation_deposit = this.newDeposit;
  //   this._location.back();
  // }

  updateEdits() {
    this.newEdit = {
      "id": this.quotationService.selectedQuotationInService.id,
      "attention": this.addForm.value.attention,
      "closing_remarks": "xyz",
      "created_by": "Jack",
      "created_date": this.myDate,
      "deposit": this.addForm.value.deposit,
      "opening_remarks": "abc",
      "quotation_date": this.myDate,
      "quotation_id": this.maxCount + 1,
      "quotation_number": this.maxCount + 1,
      "status": "pending",
      "subject": this.addForm.value.subject,
      "supplier_id": this.addForm.value.to,
      "tender_location": this.addForm.value.tenderLocation,
      "total": this.addForm.value.total,
      "updated_by": "Jack",
      "updated_date": this.myDate,
      "validity": this.addForm.value.validity,
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
}
