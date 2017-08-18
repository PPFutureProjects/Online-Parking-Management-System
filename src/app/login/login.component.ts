import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { AuthService } from "../providers/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	public valid = true;
	showSpinner = false;
	color = 'primary';
	mode = 'determinate';
	value = 50;


	constructor(private fb: FormBuilder,
		private authService: AuthService,
		private afAuth : AngularFireAuth,
		private router : Router) { }

	ngOnInit() {

		this.loginForm = this.fb.group({
			userEmail: [null, Validators.required],
			userPassword: [null, Validators.required]
		})

		if(localStorage.getItem('adminUid')){
			this.router.navigate(['/admin'])
		}
		else if(localStorage.getItem('firebaseToken')){
        this.router.navigate(['/dashboard'])
		}


	}

adminUid;
storage;
	submit() {

		this.authService.emailLogin(this.loginForm.value.userEmail, this.loginForm.value.userPassword)
			.then((login) => {
				this.authService.getUserProfile().subscribe((profile) => {
					// console.log(profile);
					if (profile == null && this.afAuth.auth.currentUser.email != 'admin@admin.com') {
						alert("You Are Blocked By Admin");
						this.authService.signOut();
					}
					if(profile != null && this.afAuth.auth.currentUser.email != 'admin@admin.com'){
						this
					}
				  this.adminUid = this.afAuth.auth.currentUser.uid;
				 if (this.adminUid == 'D6JNpT6cTtfOilIKV7cp3u1tsP42') {
					this.router.navigate(['/admin'])
					localStorage.setItem('adminUid', this.adminUid);
				}
				else if (this.adminUid !== 'D6JNpT6cTtfOilIKV7cp3u1tsP42') {
					localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
					this.storage = localStorage.getItem('firebaseToken');
					// console.log(this.storage);


					this.router.navigate(['/dashboard']);
				}

					
				})
			})

	}


}
