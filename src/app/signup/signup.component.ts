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
	  userName : [null,Validators.required],
	  userLastName : [null,Validators.required],	
      userEmail: [null,Validators.required],
	  userPassword: [null,Validators.required],
	  userTelephone : [null,Validators.required],
	  userCNIC :     [null,Validators.required],
	  userAddress : [null,Validators.required],
    })

  }

  submit(){
    this.authService.userSignup(this.signupForm.value)
   
   
  }

}
