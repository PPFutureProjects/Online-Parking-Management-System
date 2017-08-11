import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
	selector: 'app-all-users',
	templateUrl: './all-users.component.html',
	styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
	usersArray: any[] = [];

	selectedOption: string;
	selectedUserDetails;

	fetchAllUsers: FirebaseListObservable<any>;
	users : FirebaseListObservable<any>;
	fetchParkingplaza : FirebaseListObservable<any>;
	fetchChargedParking : FirebaseListObservable<any>;
	fetchCanttStation : FirebaseListObservable<any>;
	constructor(public dialog: MdDialog,
		private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private authService: AuthService) { }


	ngOnInit() {
		this.showAllUsers();
	}

	usersObject = {
		userUid: '',
		userName: '',
		userLastName: '',
		userEmail: '',
		userTelephone: '',
		userCNIC: '',
		userAddress: ''
	}
	showAllUsers() {
		this.fetchAllUsers = this.db.list('/users', { preserveSnapshot: true });
		this.fetchAllUsers
			.subscribe(snapshots => {
				this.usersArray = [];
				snapshots.forEach(snapshot => {
					this.usersObject = {
						userUid: '',
						userName: '',
						userLastName: '',
						userEmail: '',
						userTelephone: '',
						userCNIC: '',
						userAddress: ''
					}
					console.log(snapshot.key)
					console.log(snapshot.val());

					this.usersObject.userUid = snapshot.key;
					this.usersObject.userName = snapshot.val().userName;
					this.usersObject.userLastName = snapshot.val().userLastName;
					this.usersObject.userEmail = snapshot.val().userEmail;
					this.usersObject.userTelephone = snapshot.val().userTelephone;
					this.usersObject.userCNIC = snapshot.val().userCNIC;
					this.usersObject.userAddress = snapshot.val().userAddress;

					this.usersArray.push(this.usersObject)
					console.log(this.usersArray);

 
				});
			})
	}

	signOut() {
		this.authService.signOut()

	}

	openDialog(uid) {
		console.log(uid);


		// let dialogRef2 = this.dialog.open(DialogResultExampleDialog, {
		//   data : 'demo'   
		// });

		console.log(this.usersArray);
		this.usersArray.forEach((data) => {
			console.log(data.userUid);
			if (data.userUid == uid) {
				console.log(data.userUid);
				console.log(data);
				this.selectedUserDetails = data;


			}

		})

		let dialogRef = this.dialog.open(DialogResultExampleDialog, {
			height: '400px',
			width: '400px',
			data: this.selectedUserDetails,


		});

		// dialogRef.componentInstance.name= url;
		dialogRef.afterClosed().subscribe(result => {
			this.selectedOption = result;
		});
	}

	cancelUser(email,userUid) {
		console.log(email);
		console.log(userUid);
		
		this.users = this.db.list('users/', { preserveSnapshot: true });
		this.users.remove(userUid)
		
			
			
			this.cancelFromParkingPlaza(userUid);
			this.cancelFromChargedParking(userUid);
			this.cancelFromCanttStation(userUid);
	}
cancelFromParkingPlaza(userUid){
	
	
this.fetchParkingplaza = this.db.list('parking-plaza/', { preserveSnapshot: true });
this.fetchParkingplaza.remove(userUid)

}
cancelFromChargedParking(userUid){
		
this.fetchChargedParking = this.db.list('charged-parking/',  { preserveSnapshot: true });
this.fetchChargedParking.remove(userUid)

}

cancelFromCanttStation(userUid){
	
this.fetchCanttStation = this.db.list('cantt-station/', { preserveSnapshot: true });
this.fetchCanttStation.remove(userUid)

}


}

import { Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
@Component({
	selector: 'dialog-result-example-dialog',
	template: `
		
	<table style="text-align : center">
	 
	   <td> 
			  
	   <ul style="text-align : center;list-style: none">
		<tr><li style="margin: 10px;"><b>   Name</b>           </li></tr>
		<tr><li style="margin: 10px;"><b> Last Name</b>  </li></tr>
		<tr><li style="margin: 10px;"><b> Email</b>         </li></tr>
		<tr><li style="margin: 10px;"><b> Telephone</b>  </li></tr>
		<tr><li style="margin: 10px;"><b> CNIC</b>           </li></tr>
		<tr><li style="margin: 10px;"><b> Address</b>     </li></tr>
		 </ul>
		</td>

		<td >
		 <ul style="list-style : none">
		  <tr> <li style="margin: 10px;"><b> : </b></li></tr>
		  <tr> <li style="margin: 10px;"><b>:</b></li></tr>
		  <tr> <li style="margin: 10px;"><b>:</b></li></tr>
		  <tr> <li style="margin: 10px;"><b>:</b></li></tr>
		  <tr> <li style="margin: 10px;"><b>:</b></li></tr>
		  <tr> <li style="margin: 10px;"><b>:</b></li></tr>
			</ul>
		</td>


	
	
		<td>
		 <ul style="list-style : none">
		 <tr> <li style="margin: 10px;">{{data.userName}}</li> </tr>
		 <tr> <li style="margin: 10px;">{{data.userLastName}}</li></tr>
		  <tr> <li style="margin: 10px;">{{data.userEmail}}</li></tr>
		  <tr> <li style="margin: 10px;">{{data.userTelephone}}</li></tr>
		  <tr> <li style="margin: 10px;">{{data.userCNIC}}</li></tr>
		  <tr> <li style="margin: 10px;">{{data.userAddress}}</li></tr>
		  </ul>
		</td>
	</table>
			

  <div style="text-align : center"> 
   <button md-button md-dialog-close="" (click)="close()">Close</button>
</div>
  
   `,
	styleUrls: ['./all-users.component.css']
})
export class DialogResultExampleDialog {
	uid;
	// name: string;
	constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<DialogResultExampleDialog>) {
		console.log(data);




	}

	close() {
		console.log('asdasdas');

	}


}
