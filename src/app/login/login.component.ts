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

  constructor(public toggleDisplayService: ToggleDisplayService, public router: Router) { }

  loginForm: FormGroup;

  loginInfo;

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
      console.log('User has logged in');
      this.toggleDisplayService.toggle();
    }, console.error);

  }

  byPass() {
    this.toggleDisplayService.toggle();
    // this.router.navigate(['sales-module']);
  }

}
