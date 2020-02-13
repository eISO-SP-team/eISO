import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public http: HttpClient) { }

  uploadFile(file) {
    return this.http.post("https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/upload-pdf", file)
  }

  postFile(fileToUpload: File) {
    const endpoint = 'http://deimos.preskubbs.com/eiso-storage/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData)
  }
}
