import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../providers/auth.service";
@Component({
	selector: 'app-update-profile',
	templateUrl: './update-profile.component.html',
	styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

	users: FirebaseObjectObservable<any>;

	userUpdateForm: FormGroup;
	constructor(private db: AngularFireDatabase,
		private authService: AuthService,
		private fb: FormBuilder) { }
	usersObject = {

		userName: '',
		userLastName: '',
		userEmail: '',
		userCNIC: '',
		userAddress: '',
		userTelephone: ''

	}
	ngOnInit() {
		this.userUpdateForm = this.fb.group({
			userName: '',
			userLastName: '',
			userEmail: '',
			userCNIC: '',
			userAddress: '',
			userTelephone: ''
		})


		this.users = this.db.object('users/' + this.authService.currentUserId, { preserveSnapshot: true });
		this.users
			.subscribe(snapshot => {
				// snapshot.forEach(snapshot => {
				// this.usersObject = {

				// 	userName: '',
				// 	userLastName: '',
				// 	userEmail: '',
				// 	userCNIC: '',
				// 	userAddress: '',
				// 	userTelephone: ''

				// }
				console.log(snapshot.key)
				console.log(snapshot.val());
				this.usersObject.userName = snapshot.val().userName;
				this.usersObject.userLastName = snapshot.val().userLastName;
				this.usersObject.userEmail = snapshot.val().userEmail;
				this.usersObject.userCNIC = snapshot.val().userCNIC;
				this.usersObject.userAddress = snapshot.val().userAddress;
				this.usersObject.userTelephone = snapshot.val().userTelephone;
				this.userUpdateForm.setValue({
					userName: this.usersObject.userName,
					userLastName: this.usersObject.userLastName,
					userEmail: this.usersObject.userEmail,
					userCNIC: this.usersObject.userCNIC,
					userAddress: this.usersObject.userAddress,
					userTelephone: this.usersObject.userTelephone
				})
				// this.usersArray.push(this.usersObject);
				// console.log(this.usersArray);



				// });   
			})
	}

	submit() {
		this.authService.demoFunc(this.userUpdateForm.value)
		console.log(this.authService.demoFunc2);
		
		console.log(this.authService.currentUserId);

		
		console.log(this.userUpdateForm.value);
		
		this.users = this.db.object('users/' + this.authService.currentUserId);
		this.users.update({userName : this.userUpdateForm.value.userName, userLastName : this.userUpdateForm.value.userLastName,
						  userCNIC : this.userUpdateForm.value.userCNIC , userAddress : this.userUpdateForm.value.userAddress,
						  userTelephone : this.userUpdateForm.value.userTelephone})
	}

	signOut(){
		this.authService.signOut()
	}

}
