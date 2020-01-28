import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuotationService } from "../shared/service/quotation.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationViewComponent implements OnInit {

  addForm: FormGroup;

  newTitle = this.quotationService.selectedQuotationInService.quotation_title;
  newCompanyName = this.quotationService.selectedQuotationInService.quotation_subject;
  newTenderLocation = this.quotationService.selectedQuotationInService.quotation_tenderLocation;
  newTo = this.quotationService.selectedQuotationInService.quotation_to;
  newValidity = this.quotationService.selectedQuotationInService.quotation_validity;
  newAttention = this.quotationService.selectedQuotationInService.quotation_attention;
  newTotal = this.quotationService.selectedQuotationInService.quotation_total;
  newDeposit = this.quotationService.selectedQuotationInService.quotation_deposit;


  constructor(public quotationService: QuotationService, public _location: Location) { }

  ngOnInit() {
    console.log(this.quotationService.selectedQuotationInService);


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
    let index = -1;
    for (let i = 0; i < this.quotationService.quotationList.length; i++) {
      if (this.quotationService.quotationList[i].quotation_refNo == this.quotationService.selectedQuotationInService.quotation_refNo) {
        index = i;
        console.log(JSON.stringify(this.quotationService.quotationList[index].quotation_title))
        break;
      }
    }
    console.log(JSON.stringify(this.quotationService.quotationList[index]))
    this.quotationService.quotationList[index].quotation_title = this.newTitle;
    this.quotationService.quotationList[index].quotation_subject = this.newCompanyName;
    this.quotationService.quotationList[index].quotation_tenderLocation = this.newTenderLocation;
    this.quotationService.quotationList[index].quotation_to = this.newTo;
    this.quotationService.quotationList[index].quotation_validity = this.newValidity;
    this.quotationService.quotationList[index].quotation_attention = this.newAttention;
    this.quotationService.quotationList[index].quotation_total = this.newTotal;
    this.quotationService.quotationList[index].quotation_deposit = this.newDeposit;
    this._location.back();
  }
}
