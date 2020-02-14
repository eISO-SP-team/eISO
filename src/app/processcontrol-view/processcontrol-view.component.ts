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
  selector: 'app-processcontrol-view',
  templateUrl: './processcontrol-view.component.html',
  styleUrls: ['./processcontrol-view.component.css']
})
export class ProcesscontrolViewComponent implements OnInit {

  projectLINK = this.processControlService.selectedProcesscontrolInService;

  newProject_name = this.processControlService.selectedProcesscontrolInService.project_name;
  newQuotation_number = this.processControlService.selectedProcesscontrolInService.quotation_number;
  newProject_lead = this.processControlService.selectedProcesscontrolInService.project_lead;
  newTender_location = this.processControlService.selectedProcesscontrolInService.tender_location;
  newCustomer_name = this.processControlService.selectedProcesscontrolInService.customer_name;
  newCustomer_email = this.processControlService.selectedProcesscontrolInService.customer_email;
  newStart_date = this.processControlService.selectedProcesscontrolInService.start_date;
  newEnd_date = this.processControlService.selectedProcesscontrolInService.end_date;

  dateValue: any;

  addProcessControlForm: FormGroup;

  addControlPoint: FormGroup;

  selectedCustomer: any = this.processControlService.selectedProcesscontrolInService;

  customerEmail: any = "";

  testEntry: any;

  pcpEntry: any;

  pcpList: any[] = this.processControlService.selectedProcesscontrolInService.process_control_details;

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

  constructor(public quotationService: QuotationService, public processControlService: ProcesscontrolService, public customerService: CustomerService, public _location: Location, public fileUploadService: FileUploadService) {

  }

  ngOnInit() {
    this.processControlList = this.processControlService.loadProcesscontrols().subscribe(responseData => {
      this.processControlService.processcontrolList = (<any>responseData).body;
      this.processControlList = this.processControlService.processcontrolList;
      this.maxCount = this.processControlList.length;
    });

    console.log(this.pcpList);

    this.customerList = this.customerService.loadCustomers().subscribe(responseData => {
      this.customerService.customerList = responseData.body;
      this.customerList = this.customerService.customerList;
      this.newList = [];
      for (let i = 0; i < this.customerList.length; i++) {
        this.newList.push({ label: this.customerList[i].customer_name, value: this.customerList[i].id });
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
      "header_id": this.projectLINK.header_id,
      "pc_number": this.projectLINK.pc_number,
      "project_id": this.projectLINK.project_id,
      "project_name": this.newProject_name,
      "project_lead": this.newProject_lead,
      "customer_name": this.newCustomer_name,
      "customer_email": this.newCustomer_email,
      "start_date": this.newStart_date,
      "end_date": this.newEnd_date,
      "tender_location": this.newTender_location,
      "status": this.projectLINK.status,
      "uploaded_by": "Jack",
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
    this.processControlService.updateProcesscontrols(this.projectLINK.id, data)
      .subscribe((data) => {
        console.log(data)
        this.processControlService.processcontrolList.push(this.testEntry);
      });
    this._location.back();
  }

  handleChange(e: any) {
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
