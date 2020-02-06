import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToggleDisplayService {
  public isViewable: boolean = false;
  constructor(public http: HttpClient) {}

  authUser(userCred:any) {
    console.log(userCred);
    return this.http.post("https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/user/login", userCred);
  }

  public toggle(): void { this.isViewable = !this.isViewable; }
}
