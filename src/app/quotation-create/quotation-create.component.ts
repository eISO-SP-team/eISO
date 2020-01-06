import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Quotation } from "../shared/model/quotation.model";
import { QuotationService } from "../shared/service/quotation.service";
import { ToggleDisplayService } from "../shared/service/toggle-display.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.css'],
  //providers: [MessageService],
  styles: [],
})
export class QuotationCreateComponent implements OnInit {

  uploadedFiles: any[] = [];

  addForm: FormGroup;

  items: MenuItem[];

  activeIndex: number = 0;

  constructor(private messageService: MessageService, public quotationService: QuotationService, public _location: Location) { }

  ngOnInit() {

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
      'status': new FormControl(null),
    })

    this.items = [{
      label: 'Quotation',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({ severity: 'info', summary: 'Quotation Details', detail: event.item.label });
      }
    },
    {
      label: 'Quotation',
      command: (event: any) => {
        this.activeIndex = 1;
        this.messageService.add({ severity: 'info', summary: 'Quotation Quotation', detail: event.item.label });
      }
    },
    {
      label: 'Follow Up',
      command: (event: any) => {
        this.activeIndex = 2;
        this.messageService.add({ severity: 'info', summary: 'Quotation Follow Up', detail: event.item.label });
      }
    },
    // {
    //   label: 'Award',
    //   command: (event: any) => {
    //     this.activeIndex = 3;
    //     this.messageService.add({ severity: 'info', summary: 'ISO Award', detail: event.item.label });
    //   }
    // }
    ];
  }

  onAddEnquiry() {
    this.quotationService.addQuotation(new Quotation(
      0,
      this.addForm.value.date,
      this.addForm.value.companyName,
      this.addForm.value.contactPerson,
      this.addForm.value.address,
      this.addForm.value.telNo,
      this.addForm.value.email,
      this.addForm.value.fax,
      this.addForm.value.description,
      this.addForm.value.salesPerson,
      // this.addForm.value.status,
    ));
    this._location.back();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  
}
