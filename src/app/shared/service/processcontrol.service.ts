import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProcesscontrolService {

  processcontrolSubject: BehaviorSubject<any[]>;

  selectedProcesscontrolInService: any;

  processcontrolList: any[] = [

  ];


  constructor(public http: HttpClient) {
    this.processcontrolSubject = new BehaviorSubject<any[]>(this.processcontrolList);
  }


  getProcesscontrolListener() {
    return this.processcontrolSubject.asObservable();
  }

  addProcesscontrols(processcontrols) {
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/process-control', processcontrols, {
    });
  }

  loadProcesscontrols() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/process-control');
  }

  updateProcesscontrols(enquiryId, newInfo) {
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/process-control/' + enquiryId, newInfo)
  }

  deleteProcesscontrols(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/process-control/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/process-control/' + enquiryId)
  }
}

