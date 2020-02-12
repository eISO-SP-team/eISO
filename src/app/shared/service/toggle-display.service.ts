import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ToggleDisplayService {

  public isViewable: boolean = false;

  loginSubject: BehaviorSubject<boolean>;

  isLogin: boolean = false;

  constructor(public http: HttpClient, public router: Router) {
    this.loginSubject = new BehaviorSubject<any>(this.isLogin);
  }

  authUser(userCred: any) {
    console.log(userCred);
    return this.http.post("https://vr7zo9ukcl.execute-api.ap-southeast-1.amazonaws.com/dev/user/login", userCred).pipe(
      catchError(this.handleError)
    );;
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.text}`);
      if (error.error.text == 'Login successful') {
        this.isLogin = true;
        console.log(this.isLogin)
        this.loginSubject.next(this.isLogin)
        console.log("Login Successfully");
      }
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getLoginListener() {
    return this.loginSubject.asObservable();
  }

  public toggle(): void { this.isViewable = !this.isViewable; }
}
