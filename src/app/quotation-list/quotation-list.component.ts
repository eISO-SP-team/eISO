import { Component, OnInit } from '@angular/core';
import { Quotation } from "../shared/model/quotation.model";
import { QuotationService } from "../shared/service/quotation.service";
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css'],
})

export class QuotationListComponent implements OnInit {

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  msgs: Message[] = [];

  rows = this.quotationService.rows;

  quotationList: any;

  newlist: any;

  selectedValues: Quotation[] = [];

  selectedQuotation: Quotation;

  selectQuotations: Quotation[];

  constructor(private quotationService: QuotationService, public router: Router, private confirmationservice: ConfirmationService) {

    this.quotationService.getQuotationListener()
      .subscribe(newList => {
        // console.log("listener triggered");
        // console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.quotationList = newList;
        // console.log(newList);
      });

  }

  ngOnInit() {

    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'created_date' },
      { label: 'Status', value: 'quotationList.status' }
    ];

    this.newlist = this.quotationService.loadQuotation().subscribe(responseData => {
      this.quotationService.quotationList = responseData.body;
      this.quotationList = this.quotationService.quotationList;
    });
  }

  viewEnquiry(quotationList) {
    console.log("In onViewDetail......" + JSON.stringify(quotationList));
    this.quotationService.selectedQuotationInService = quotationList;
    this.router.navigate(['/quotationView', quotationList.id]);
  }

  deleteEnquiry(enquiry) {
    this.quotationService.deleteQuotation(enquiry.id).subscribe(() => {
      console.log("Delete this enquiry......" + JSON.stringify(enquiry));
      let index = -1;
      for (let i = 0; i < this.quotationList.length; i++) {
        if (this.quotationList[i].id == enquiry.id) {
          index = i;
          break;
        }
      }
      this.quotationList.splice(index, 1);
    });
  }

  viewMore() {
    this.quotationService.rows = 100;
    this.router.navigate(['/quotationList']);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  confirm(enquiry) {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteEnquiry(enquiry);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
}
