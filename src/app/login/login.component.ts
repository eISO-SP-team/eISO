import { Component, OnInit } from '@angular/core';
import { ToggleDisplayService } from "../shared/service/toggle-display.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(public toggleDisplayService: ToggleDisplayService, public router: Router) {
    // this.toggleDisplayService.getLoginListener().subscribe(loginValue => {
    //   if (this.toggleDisplayService.isLogin == true) {
    //     console.log("Login Successfully");
    //     this.toggleDisplayService.toggle();
    //     this.router.navigate(['sales-module']);
    //   } else {
    //     console.log("fail")
    //   }
    // })
  }

  loginForm: FormGroup;

  loginInfo: { email: any; password: any; };

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  onLogin() {
    this.loginInfo = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    var data = JSON.stringify(this.loginInfo);
    this.toggleDisplayService.authUser(data).subscribe((data) => {
      console.log(data);
      this.toggleDisplayService.toggle();
    })
    // if (this.toggleDisplayService.isLogin == true) {
    //   console.log("Login Successfully");
    //   this.toggleDisplayService.toggle();
    //   this.router.navigate(['sales-module']);
    // } else {
    //   console.log("fail")
    // }
  }

  byPass() {
    this.toggleDisplayService.toggle();
    this.router.navigate(['sales-module']);
  }

}
