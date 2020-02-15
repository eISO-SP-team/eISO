import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SalesorderService } from "../shared/service/salesorder.service";
import { CustomerService } from "../shared/service/customer.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem, ConfirmationService } from 'primeng/api'
import { QuotationService } from '../shared/service/quotation.service';
import { FileUploadService } from '../shared/service/file-upload.service';
import { Router } from '@angular/router';

interface Type {
  name: string;
  value: string;
}

interface cust {
  name: string;
  value: string;
}

@Component({
  selector: 'app-salesorder-view',
  templateUrl: './salesorder-view.component.html',
  styleUrls: ['./salesorder-view.component.css']
})
export class SalesorderViewComponent implements OnInit {

  customer: cust[];

  prefix: Type[];

  selectedCustomer: any;

  addSalesOrderForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  newEdit: any;

  customerList: any;

  value: Date;

  newList: SelectItem[];

  newList2: SelectItem[];

  salesOrderList: any;

  newQuotationNumber = this.salesOrderService.selectedSalesOrderInService.quotation_number;
  newCustomerId = this.salesOrderService.selectedSalesOrderInService.customer_id;
  newDate = this.salesOrderService.selectedSalesOrderInService.sales_order_date;
  newSubject = this.salesOrderService.selectedSalesOrderInService.subject;
  newPic = this.salesOrderService.selectedSalesOrderInService.pic;
  newPicEmail = this.salesOrderService.selectedSalesOrderInService.pic_emain;
  newTenderLocation = this.salesOrderService.selectedSalesOrderInService.tender_location;
  newTotal = this.salesOrderService.selectedSalesOrderInService.total;
  newDeposit = this.salesOrderService.selectedSalesOrderInService.deposit;
  quotationList: any;

  constructor(private router: Router, public quotationService: QuotationService, public customerService: CustomerService, public salesOrderService: SalesorderService, public _location: Location, private confirmationservice: ConfirmationService, public fileUploadService: FileUploadService) {
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
      console.log(this.quotationList);
      for (let i = 0; i < this.customerList.length; i++) {
        this.newList2.push({ label: this.quotationList[i].subject, value: this.quotationList[i].id });
      }
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
    });
  }

  updateEdits() {
    this.newEdit = {
      "sales_order_id": this.salesOrderService.selectedSalesOrderInService.sales_order_id,
      "sales_order_number": this.salesOrderService.selectedSalesOrderInService.sales_order_number,
      "sales_order_date": this.newDate,
      "customer_id": this.newCustomerId,
      "subject": this.newSubject,
      "tender_location": this.newTenderLocation,
      "quotation_number": this.newQuotationNumber,
      "status": "pending",
      "total": this.newTotal,
      "deposit": this.newDeposit,
      "pic": this.newPic,
      "pic_email": this.newPicEmail,
      "created_by": "Jack",
      "created_date": this.salesOrderService.selectedSalesOrderInService.created_date,
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
        "reference_date": this.salesOrderService.selectedSalesOrderInService.sales_order_details.reference_date,
        "created_date": this.salesOrderService.selectedSalesOrderInService.sales_order_details.created_date,
        "updated_date": this.salesOrderService.selectedSalesOrderInService.sales_order_details.updated_date,
        "status": this.salesOrderService.selectedSalesOrderInService.sales_order_details.status
      }
    };
    console.log(JSON.stringify(this.newEdit));
    var data = JSON.stringify(this.newEdit);
    this.salesOrderService.updateSalesorder(this.salesOrderService.selectedSalesOrderInService.id, data)
      .subscribe((data) => {
        // console.log("Updated: " + data)
        this._location.back();
      });
  }

  approve() {
    this.salesOrderService.selectedSalesOrderInService.pic_email = this.newPicEmail,
      this.salesOrderService.selectedSalesOrderInService.sales_order_details.status = "completed";
    var data = JSON.stringify(this.salesOrderService.selectedSalesOrderInService);
    console.log(data);
    this.salesOrderService.updateSalesorder(this.salesOrderService.selectedSalesOrderInService.id, data)
      .subscribe(() => {
        // console.log("Updated: " + data)
        this.confirm2();
      });
  }

  confirm() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.approve();
      },
      reject: () => {
      }
    });
  }

  confirm2() {
    this.confirmationservice.confirm({
      message: 'Do you wish to proceed to create a process control?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/processcontrolCreate']);
      },
      reject: () => {
        this._location.back();
      }
    });
  }

}
