import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AuthService } from "../providers/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;


  constructor(private fb: FormBuilder,
              private authService : AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
	  userName : 'user12',
	  userLastName : 'user12 father',		
      userEmail: 'u12@u.com',
	  userPassword: '000000',
	  userTelephone : '0312',
	  userCNIC : '42000',
	  userAddress : '12345'	
    })

  }

  submit(){
    this.authService.userSignup(this.signupForm.value)
   
   
  }

}
