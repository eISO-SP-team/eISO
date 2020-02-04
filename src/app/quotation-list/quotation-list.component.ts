import { Component, OnInit } from '@angular/core';
import { Quotation } from "../shared/model/quotation.model";
import { QuotationService } from "../shared/service/quotation.service";
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css'],
  providers: [MessageService]
})

export class QuotationListComponent implements OnInit {

  quotationList;

  newlist;

  selectedValues: Quotation[] = [];

  selectedQuotation: Quotation;

  selectQuotations: Quotation[];

  constructor(private quotationService: QuotationService, public router: Router, ) {

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
}
