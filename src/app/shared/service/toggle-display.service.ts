import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToggleDisplayService {
  public isViewable: boolean;
  constructor(public http: HttpClient) { this.isViewable = true; }

  authUser(userCred) {
    return this.http.post("https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/login", userCred)
  }

  public toggle(): void { this.isViewable = !this.isViewable; }
}
