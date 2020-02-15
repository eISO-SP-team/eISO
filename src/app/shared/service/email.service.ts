import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: HttpClient) { }


  sendEmail(data) {
    return this.http.post("http://localhost:3000/sendmail", data)
  }


}
