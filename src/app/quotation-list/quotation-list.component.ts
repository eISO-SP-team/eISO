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

  quotationList: Quotation[] = [
  ];

  selectedQuotation: Quotation;

  selectQuotations: Quotation[];

  items: MenuItem[];

  cols: any[];

  constructor(private quotationService: QuotationService, private messageService: MessageService, public router: Router, ) {

    //this.quotationList = this.quotationService.quotationList;
    this.quotationService.getQuotationListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        //listens the listener in the service, whenever the code 
        //this.enquirySubject.next(this.quotationList); runs, the subscribe will be triggered and will receive the 
        //new list that is being passed in
        this.quotationList = newList;
        console.log(newList);
      });

  }

  ngOnInit() {


    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewEnquiry(this.selectedQuotation) },
      // { label: 'Delete', icon: 'pi pi-times', command: (event) => alert(delete this.selectedQuotation) }
      // { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedQuotation) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteEnquiry(this.selectedQuotation) }
    ];



    this.cols = [
      { field: 'quotation_refNo', header: 'ENQ No.' },
      { field: 'quotation_prospectName', header: 'Customer Name' },
      { field: 'quotation_subPerson', header: 'Contact Person' },
      { field: 'quotation_email', header: 'Email' },
      { field: 'quotation_description', header: 'Description' },
      { field: 'status', header: 'Status' },
    ];

  }

  selectQuotation() {
    
  }

  viewEnquiry(quotationList: Quotation) {
    console.log("In onViewDetail......" + JSON.stringify(quotationList));
    this.quotationService.selectedQuotationInService = quotationList;
    this.router.navigate(['/quotationView', quotationList.quotation_refNo]);
  }

  deleteEnquiry(enquiry: Quotation) {
    let index = -1;
    for (let i = 0; i < this.quotationList.length; i++) {
      if (this.quotationList[i].quotation_refNo == enquiry.quotation_refNo) {
        index = i;
        break;
      }
    }
    this.quotationList.splice(index, 1);
  }
}
