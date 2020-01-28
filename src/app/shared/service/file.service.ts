import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileSubject: BehaviorSubject<any[]>;

  selectedFileService: any;

  fileList: any[] = [

  ];


  constructor(public http: HttpClient) {
    this.fileSubject = new BehaviorSubject<any[]>(this.fileList);
  }


  getFileListener() {
    return this.fileSubject.asObservable();
  }

  addFiles(files) {
    return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/file', files, {
    });
  }

  loadFiles() {
    return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/file');
  }

  updateFiles(enquiryId, newInfo) {
    return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/file/' + enquiryId, newInfo)
  }

  deleteFile(enquiryId) {
    console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/file/' + enquiryId);
    return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/file/' + enquiryId)
  }
}

