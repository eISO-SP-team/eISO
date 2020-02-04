import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProcesscontrolService } from "../shared/service/processcontrol.service";
import { CustomerService } from "../shared/service/customer.service";
import { QuotationService } from "../shared/service/quotation.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'

interface Type {
  name: string;
  value: string;
}

interface cust {
  name: string;
  value: string;
}

@Component({
  selector: 'app-processcontrol-create',
  templateUrl: './processcontrol-create.component.html',
  styleUrls: ['./processcontrol-create.component.css']
})
export class ProcesscontrolCreateComponent implements OnInit {

  customer: cust[];

  customerEmail:any;

  selectedCustomer: any;

  addProcessControlForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  quotationList: any;

  processControlList: any;

  value: Date;

  newList: SelectItem[];

  newList2: SelectItem[];

  salesOrderList: any;

  maxCount: any;

  constructor(public quotationService: QuotationService, public processControlService: ProcesscontrolService, public customerService: CustomerService, public _location: Location) { }

  ngOnInit() {
    this.processControlList = this.processControlService.loadProcesscontrols().subscribe(responseData => {
      this.processControlService.processcontrolList = (<any>responseData).body;
      this.processControlList = this.processControlService.processcontrolList;
      this.maxCount = this.processControlList.length;
    });
    
    this.customerList = this.customerService.loadCustomers().subscribe(responseData => {
      this.customerService.customerList = responseData.body;
      this.customerList = this.customerService.customerList;
      this.newList = [];
      for (let i = 0; i < this.customerList.length; i++) {
        this.newList.push({ label: this.customerList[i].customer_name, value: this.customerList[i].id });
      }
    });

    this.quotationList = this.quotationService.loadQuotation().subscribe(responseData => {
      this.quotationService.quotationList = responseData.body;
      this.quotationList = this.quotationService.quotationList;
      this.newList2 = [];
      for (let i = 0; i < this.quotationList.length; i++) {
        this.newList2.push({ label: this.quotationList[i].quotation_number, value: this.quotationList[i].quotation_number });
      }
    });

    this.addProcessControlForm = new FormGroup({
      'project_name': new FormControl(null, [Validators.required]),
      'quotation_number': new FormControl(null, [Validators.required]),
      'project_lead': new FormControl(null, [Validators.required]),
      "tender_location": new FormControl(null, [Validators.required]),
      "customer_name": new FormControl(null, [Validators.required]),
      "customer_email": new FormControl(null, [Validators.required]),
      "tenderLocation": new FormControl(null, [Validators.required]),
      "start_date": new FormControl(null, [Validators.required]),
      "end_date": new FormControl(null, [Validators.required]),
    });
  }

  onAddEnquiry() {
    console.log(this.addProcessControlForm.value.customer_id);
    this.testEntry = {
      "header_id": this.maxCount +1,
      "pc_number": this.maxCount +1,
      "project_id": this.maxCount +1,
      "project_name": this.addProcessControlForm.value.project_name,
      "status": "pending",
      "process_control_details": {
          "header_id": "213",
          "due_date": "2019-11-26",
          "pic": "Jack",
          "line_id": "213",
          "created_by": "Jack",
          "reference_type": "abc",
          "uploaded_by": "Jack",
          "file": "abc.abc",
          "line_number": 5,
          "uploaded_date": "2019-11-26",
          "document_process": "abc",
          "created_date": "2019-11-26",
          "document_type": "abc",
          "status": "pending"
      },
  
  };
    console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.processControlService.addProcesscontrols(data)
      .subscribe((data) => {
        console.log(data)
        this.processControlService.processcontrolList.push(this.testEntry);
      });
    this._location.back();
  }
}
