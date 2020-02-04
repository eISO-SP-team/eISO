import { Injectable, EventEmitter } from '@angular/core';
import { Quotation } from "../model/quotation.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  quotationSubject: BehaviorSubject<any[]>;

  selectedQuotationInService:any;

  quotationList: any;
  // quotationList: Quotation[] = [
  //   new Quotation(31, "Project 101", "Skubbs", "99 Kaki Bukit Avenue 1", "Mr Cucumber", "invalid","julious@im.skubbs.com", "1000", "500","Draft"),
  //   new Quotation(30, "Project X", "SP", "Avenue 1", "Mr Cucumber", "valid","abc@mail.com", "10000", "0","Approved"),
  //   new Quotation(29, "Project Z", "ST Engineer", "Avenue 2", "Mr Lettuce", "invalid","xyz@mail.com", "300", "10","Pending"),
  //   new Quotation(28, "Project Y", "Singtel", "Avenue 3", "Mr Tomato", "pending","123@mail.com", "500", "10","Draft"),
  // ];

  constructor(public http: HttpClient) {
    this.quotationSubject = new BehaviorSubject<any[]>(this.quotationList);
  }

  getQuotationListener() {
    return this.quotationSubject.asObservable();
  }

  addQuotations(newQuotation) {
    console.log("before: " + this.quotationList);
    this.quotationList.unshift(JSON.parse(newQuotation));
    console.log("before: " + this.quotationList);
    //basically, you update this listener with the new list, 
    //anyone that is subscribing to the enquiry will get the latest list
    this.quotationSubject.next(this.quotationList);
    return this.http.post('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/quotation', newQuotation, {
    });
  }

  loadQuotation(): Observable<any> {
    return this.http.get<any>('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/quotation');
  }

  updateQuotation(enquiryId, newInfo) {
    return this.http.put('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/quotation/' + enquiryId, newInfo)
  }

  deleteQuotation(enquiryId) {
    console.log('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/quotation/' + enquiryId);
    return this.http.delete('https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/quotation/' + enquiryId)
  }
}


