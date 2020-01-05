import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Quotation } from "../shared/model/quotation.model";
import { QuotationService } from "../shared/service/quotation.service";

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationViewComponent implements OnInit {

  addForm: FormGroup;

  constructor(private messageService: MessageService, public quotationService: QuotationService) { }

  ngOnInit() {
    console.log(this.quotationService.selectedQuotationInService);


    this.addForm = new FormGroup({
      'date': new FormControl(null, [Validators.required]),
      'companyName': new FormControl(null, [Validators.required]),
      'contactPerson': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'telNo': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'fax': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'salesPerson': new FormControl(null, [Validators.required]),
      'file': new FormControl(null),
    })
    this.addForm.value.date = this.quotationService.selectedQuotationInService.quotation_date,
    this.addForm.value.companyName = this.quotationService.selectedQuotationInService.quotation_prospectName,
    this.addForm.value.contactPerson  = this.quotationService.selectedQuotationInService.quotation_contactPerson,
    this.addForm.value.address  = this.quotationService.selectedQuotationInService.quotation_address,
    this.addForm.value.telNo  = this.quotationService.selectedQuotationInService.quotation_telNo,
    this.addForm.value.email = this.quotationService.selectedQuotationInService.quotation_email,
    this.addForm.value.fax = this.quotationService.selectedQuotationInService.quotation_fax,
    this.addForm.value.description = this.quotationService.selectedQuotationInService.quotation_description,
    this.addForm.value.salesPerson = this.quotationService.selectedQuotationInService.quotation_subPerson

  }

}
