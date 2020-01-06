import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Quotation } from "../shared/model/quotation.model";
import { QuotationService } from "../shared/service/quotation.service";
import {Location} from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationViewComponent implements OnInit {

  addForm: FormGroup;

  constructor(private messageService: MessageService, public quotationService: QuotationService, public _location: Location) { }

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
    this.quotationService.quotationList[index].quotation_title = this.addForm.value.title;
    this.quotationService.quotationList[index].quotation_subject = this.addForm.value.companyName;
    this.quotationService.quotationList[index].quotation_tenderLocation = this.addForm.value.quotation_tenderLocation;
    this.quotationService.quotationList[index].quotation_to = this.addForm.value.quotation_to;
    this.quotationService.quotationList[index].quotation_validity = this.addForm.value.quotation_validity;
    this.quotationService.quotationList[index].quotation_attention = this.addForm.value.quotation_attention;
    this.quotationService.quotationList[index].quotation_total = this.addForm.value.quotation_total;
    this.quotationService.quotationList[index].quotation_deposit = this.addForm.value.quotation_deposit;
    this._location.back();
  }
}
