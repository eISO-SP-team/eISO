import { Injectable, EventEmitter } from '@angular/core';
import { Quotation } from "../model/quotation.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  quotationSubject: BehaviorSubject<Quotation[]>;

  selectedQuotationInService: Quotation;

  // quotationList: Quotation[] = [
  //   new Quotation(31, "2019-05-29", "Skubbs", "Mr Cucumber", "99 Kaki Bukit Avenue 1", "12345678", "julious@im.skubbs.com", "123456787", "Description", "Leonardo Di Caprio","Draft"),
  //   new Quotation(30, "2018-11-28", "Associates Tech Pte Ltd", "Mr Howler", "263 River Valley Road", "96849769", "dennischanlf@gmail.com", "#01-25", "ISO 9001 consultancy", "Leonardo Di Caprio","Pending"),
  //   new Quotation(29, "2018-09-04", "Stawhats", "Mr Muscle", "Grandline", "123", "hats@gmail.com", "fax123", "Pirates", "Benedict Cumberbatch","Approved"),
  //   new Quotation(28, "2018-09-04", "Stawhats", "Giraffe", "Grandline", "123", "hats@gmail.com", "fax123", "Pirates", "Benedict Cumberbatch","Draft"),
  // ];
  quotationList: Quotation[] = [
    new Quotation(31, "Project 101", "Skubbs", "99 Kaki Bukit Avenue 1", "Mr Cucumber", "invalid","julious@im.skubbs.com", "1000", "500","Draft"),
    new Quotation(30, "Project X", "SP", "Avenue 1", "Mr Cucumber", "valid","abc@mail.com", "10000", "0","Approved"),
    new Quotation(29, "Project Z", "ST Engineer", "Avenue 2", "Mr Lettuce", "invalid","xyz@mail.com", "300", "10","Pending"),
    new Quotation(28, "Project Y", "Singtel", "Avenue 3", "Mr Tomato", "pending","123@mail.com", "500", "10","Draft"),
  ];

  constructor() {
    this.quotationSubject = new BehaviorSubject<Quotation[]>(this.quotationList);
  }

  addQuotation(newQuotationInfo: Quotation) {
    return new Promise(resolve => {
       console.log("Retrieved enquiry");
    console.log(newQuotationInfo);
    this.quotationList.unshift(newQuotationInfo);
    console.log(this.quotationList);
    //basically, you update this listener with the new list, 
    //anyone that is subscribing to the enquiry will get the latest list
    this.quotationSubject.next(this.quotationList);

    console.log("triggered behaviour subject");
    resolve(true);
    });
   
  };

  getQuotationListener() {
    return this.quotationSubject.asObservable();
  }
}
