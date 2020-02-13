import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProcesscontrolService } from "../shared/service/processcontrol.service";
import { CustomerService } from "../shared/service/customer.service";
import { QuotationService } from "../shared/service/quotation.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";

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

  dateValue: any;

  addProcessControlForm: FormGroup;

  addControlPoint: FormGroup;

  selectedCustomer: any = null;

  customerEmail: any = "";

  testEntry: any;

  pcpEntry: any;

  pcpList: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  uploadedFiles: any[] = [];

  customerList: any;

  quotationList: any;

  processControlList: any;

  value: Date;

  newList: SelectItem[];

  newList2: SelectItem[];

  salesOrderList: any;

  maxCount: any;

  display: boolean;

  clickedonPhase: string = "PREPARATION";

  constructor(public quotationService: QuotationService, public processControlService: ProcesscontrolService, public customerService: CustomerService, public _location: Location, public fileUploadService: FileUploadService) { }

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
        this.newList.push({ label: this.customerList[i].customer_name, value: this.customerList[i] });
        console.log(this.newList);
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
      "start_date": new FormControl(null, [Validators.required]),
      "end_date": new FormControl(null, [Validators.required]),
    });

    this.addControlPoint = new FormGroup({
      "process_control_point": new FormControl(null, [Validators.required]),
      "pic": new FormControl(null, [Validators.required]),
      "due_date": new FormControl(null, [Validators.required]),
      "status": new FormControl(null, [Validators.required]),
    });
  }

  onAddEnquiry() {
    console.log(this.addProcessControlForm.value.customer_id);
    this.testEntry = {
      "header_id": this.maxCount + 1,
      "pc_number": this.maxCount + 1,
      "project_id": this.maxCount + 1,
      "project_name": this.addProcessControlForm.value.project_name,
      "project_lead": this.addProcessControlForm.value.project_lead,
      "customer_name": this.addProcessControlForm.value.customer_name.id,
      "customer_email": this.addProcessControlForm.value.customer_email,
      "start_date": this.addProcessControlForm.value.start_date,
      "end_date": this.addProcessControlForm.value.end_date,
      "tender_location": this.addProcessControlForm.value.tender_location,
      "status": "pending",
      "process_control_details": {
        "header_id": "213",
        "due_date": "2019-11-26",
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

  handleChange(e) {
    var index = e.index;

    if (index == 0) {
      this.clickedonPhase = "PREPARATION";
    } else if (index == 1) {
      this.clickedonPhase = "IN PROGRESS PHASE";
    } else {
      this.clickedonPhase = "FINAL PHASE";
    }
    console.log(this.clickedonPhase);
  }

  showDialog() {
    this.display = true;
  }

  onSubmitCp() {
    this.pcpEntry = {
      "design_id": "12890430",
      "design_details_id": "219",
      "project_id": "1231",
      "line_number": 5,
      "design_date": this.addControlPoint.value.due_date,
      "design_phase": this.clickedonPhase,
      "assignee": "Wolverine",
      "file_type": "pdf",
      "reference_type": "abc",
      "file": "new.pdf",
      "due_date": this.addControlPoint.value.due_date,
      "status": "pending",
      "created_by": this.addControlPoint.value.who,
      "created_date": this.myDate,
      "uploaded_by": this.addControlPoint.value.who,
      "uploaded_date": this.myDate
    }
    this.pcpList.unshift(this.pcpEntry);
    this.display = false;
    this.addControlPoint.reset();
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.fileUploadService.uploadFile(file).subscribe((result) => {
        console.log(result);
      })
      console.log(this.uploadedFiles);
    }
  }

  valuechange(value) {
    if (this.selectedCustomer != null) {
      console.log(value);
      this.selectedCustomer = this.addProcessControlForm.value.customer_name;
      this.customerEmail = this.selectedCustomer.customer_contact.email;
      console.log(this.selectedCustomer.id + "," + this.customerEmail);
    } else {

    }

  }
}
