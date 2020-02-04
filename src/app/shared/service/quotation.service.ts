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


