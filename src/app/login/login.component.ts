import { Component, OnInit,ElementRef  } from '@angular/core';
import { ToggleDisplayService } from "../shared/service/toggle-display.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {PasswordModule} from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(public toggleDisplayService: ToggleDisplayService, public router: Router, public ef:ElementRef) {
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
  hide : boolean;

  loginForm: FormGroup;

  loginInfo: { email: any; password: any; };

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    })
    this.hide = true;
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
    this.toggleDisplayService.isLogin = true;
    this.router.navigate(['sales-module']);

  }

  showPass(){
      // if (this.('type')== 'password'){
        
      // }

      // if ( this.ef.nativeElement.type == "password"){
      //   this.ef.nativeElement.type = "text";
      //   this.ef.nativeElement.class = "fa fa-eye-slash eyePos";
      // }
      // if (this.hide == !true){
      //   this.ef.nativeElement.class = "fa fa-eye-slash eyePos"
      // }
      this.hide = !this.hide;
      
  }
}
