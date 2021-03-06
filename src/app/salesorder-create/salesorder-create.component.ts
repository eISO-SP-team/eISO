import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SalesorderService } from "../shared/service/salesorder.service";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";
import { QuotationService } from '../shared/service/quotation.service';

interface Type {
  name: string;
  value: string;
}

interface cust {
  name: string;
  value: string;
}

@Component({
  selector: 'app-salesorder-create',
  templateUrl: './salesorder-create.component.html',
  styleUrls: ['./salesorder-create.component.css']
})

export class SalesorderCreateComponent implements OnInit {

  msgs: Message[] = [];

  customer: cust[];

  prefix: Type[];

  selectedCustomer: any;

  addSalesOrderForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  uploadedFiles: any[] = [];

  customerList: any;

  quotationList: any;

  value: Date;

  newList: SelectItem[];

  newList2: SelectItem[];

  salesOrderList: any;

  maxCount: any;

  quotationRef: any =this.quotationService.selectedQuotationInService.id;

  constructor(public quotationService: QuotationService, public customerService: CustomerService, public salesOrderService: SalesorderService, public _location: Location, private confirmationservice: ConfirmationService, public fileUploadService: FileUploadService) {

  }

  ngOnInit() {
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
      //console.log(this.quotationList);
      for (let i = 0; i < this.customerList.length; i++) {
        this.newList2.push({ label: this.quotationList[i].subject, value: this.quotationList[i].id });
      }
    });

    this.salesOrderList = this.salesOrderService.loadSalesorder().subscribe(responseData => {
      this.salesOrderService.salesOrderList = responseData.body;
      this.salesOrderList = this.salesOrderService.salesOrderList;
      this.maxCount = this.salesOrderService.salesOrderList.length;
    });

    this.addSalesOrderForm = new FormGroup({
      'quotation_number': new FormControl(null, [Validators.required]),
      'customer_id': new FormControl(null, [Validators.required]),
      "date": new FormControl(null, [Validators.required]),
      "subject": new FormControl(null, [Validators.required]),
      "pic": new FormControl(null, [Validators.required]),
      "tenderLocation": new FormControl(null, [Validators.required]),
      "picEmail": new FormControl(null, [Validators.required]),
      "total": new FormControl(null, [Validators.required]),
      "deposit": new FormControl(null, [Validators.required]),
    })
  }

  onAddEnquiry() {
    //console.log(this.addSalesOrderForm.value.customer_id);
    this.testEntry = {
      "sales_order_id": this.maxCount + 1,
      "sales_order_number": this.maxCount + 1,
      "sales_order_date": this.addSalesOrderForm.value.date,
      "customer_id": this.addSalesOrderForm.value.customer_id,
      "subject": this.addSalesOrderForm.value.subject,
      "tender_location": this.addSalesOrderForm.value.tenderLocation,
      "quotation_number": this.addSalesOrderForm.value.quotation_number,
      "status": "pending",
      "total": this.addSalesOrderForm.value.total,
      "deposit": this.addSalesOrderForm.value.deposit,
      "pic": this.addSalesOrderForm.value.pic,
      "pic_email": this.addSalesOrderForm.value.picEmail,
      "created_by": "Jack",
      "created_date": "2020-01-27T23:32:16.372Z",
      "sales_order_details": {
        "total_price": 150,
        "approval": "not approved",
        "type": "pdf",
        "sales_ order_id": "201",
        "created_by": "Jack",
        "reference_type": "abc",
        "prepared_by": "Jack",
        "file": "report.pdf",
        "line_number": "1",
        "next_followup": "2019-11-26",
        "updated_by": "Jack",
        "reference_date": this.myDate,
        "created_date": this.myDate,
        "updated_date": this.myDate,
        "status": "pending"
      }
    };
    //console.log(JSON.stringify(this.testEntry));
    var data = JSON.stringify(this.testEntry);
    this.salesOrderService.addSalesorder(data)
      .subscribe((data) => {
        //console.log(data)
        this.salesOrderService.salesOrderList.push(this.testEntry);
      });
    this._location.back();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.fileUploadService.uploadFile(file).subscribe((result) => {
        //console.log(result);
      })
      //console.log(this.uploadedFiles);
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
