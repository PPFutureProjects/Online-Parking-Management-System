import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../providers/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
 showSpinner = false;
  // isDeterminate = true;
  color = 'primary';
  mode = 'determinate';
  value = 50;


  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      userEmail: '',
      userPassword: ''
    })

  }

  submit(){
  // console.log(this.loginForm.value);
  
    this.authService.emailLogin(this.loginForm.value.userEmail,this.loginForm.value.userPassword)
   .then((succes)=>{
     this.showSpinner = true;
   })
  
}


}
