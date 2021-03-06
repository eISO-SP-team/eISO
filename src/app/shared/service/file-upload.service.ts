import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  convertFile;

  constructor(public http: HttpClient) { }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
      // const convertResult = reader.result;
      // this.convertFile = convertResult;
    };
    reader.onerror = function (error) {
      //console.log('Error: ', error);
    };
 }

  uploadFile(file:any) {
    this.getBase64(file);
    return this.http.post("https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/upload-pdf", this.convertFile);
  }

  

  // postFile(fileToUpload: File) {
  //   const endpoint = 'http://deimos.preskubbs.com/eiso-storage/';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.http
  //     .post(endpoint, formData)
  // }
}
