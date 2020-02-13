import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuotationService } from "../shared/service/quotation.service";
import { VendorService } from "../shared/service/vendor.service";
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { formatDate } from '@angular/common';
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";

interface supplier {
  name: string;
  value: string;
}

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.css'],
})
export class QuotationCreateComponent implements OnInit {
  msgs: Message[] = [];

  supplier: supplier[];

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  uploadedFiles: any[] = [];

  addForm: FormGroup;

  vendorList: any;

  activeIndex: number = 0;

  newList: SelectItem[];

  testEntry: any;

  maxCount: any;

  quotationList: any;

  constructor(public quotationService: QuotationService, public vendorService: VendorService, public _location: Location, private confirmationservice: ConfirmationService, public fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.quotationList = this.quotationService.loadQuotation().subscribe(responseData => {
      this.quotationService.quotationList = responseData.body;
      this.quotationList = this.quotationService.quotationList;
      this.maxCount = this.quotationList.length;
    });

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
      'subject': new FormControl(null, [Validators.required]),
      'tenderLocation': new FormControl(null, [Validators.required]),
      'to': new FormControl(null, [Validators.required]),
      'validity': new FormControl(null, [Validators.required]),
      'attention': new FormControl(null, [Validators.required]),
      'total': new FormControl(null, [Validators.required]),
      'deposit': new FormControl(null, [Validators.required]),

    })


  }

  onAddEnquiry() {
    this.testEntry = {
      "id": this.maxCount + 1,
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
    console.log(JSON.stringify(this.testEntry.supplier_id));
    var data = JSON.stringify(this.testEntry);
    this.quotationService.addQuotations(data)
      .subscribe((data) => {
        console.log(data)
        this.quotationService.quotationList.push(this.testEntry);
      });
    this._location.back();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.fileUploadService.postFile(file).subscribe((result) => {
        console.log(result);
      })
      console.log(this.uploadedFiles);
    }
  }

  confirm() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.onAddEnquiry();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }



}
