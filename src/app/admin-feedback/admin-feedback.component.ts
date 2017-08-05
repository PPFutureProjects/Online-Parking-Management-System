import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { AuthService } from "../providers/auth.service";
import { FeedbackService } from "../providers/feedback.service";


@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
	items: FirebaseObjectObservable<any>;
    fetchFeedback : FirebaseListObservable<any>;
	userName;
	adminName;
	adminMessage;
	adminType;
	userDataArray = [];
	adminDataArray = [];

	constructor(private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private feedbackService: FeedbackService,
		private authService: AuthService) { }

	ngOnInit() {
  this.showFeedback()
	}
   
		showFeedback() {
		
		
		this.fetchFeedback = this.db.list('feedback/', { preserveSnapshot: true });
		this.fetchFeedback
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val());

					snapshot.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val())
					// this.adminName    = snapshot.val().name;
					// this.adminMessage = snapshot.val().message
					// this.adminType    = snapshot.val().type;
					// this.adminDataArray.push(snapshot.val())
					if(snapshot.val().type == 'admin'){
						console.log(snapshot.val());
						this.adminDataArray.push(snapshot.val())
						
					}
					else if(snapshot.val().type == 'user'){
						console.log(snapshot.val());
					this.userDataArray.push(snapshot.val())
					}	
				
					
					
					
				});
				});
			})
	}
	submitFeedback(adminFeedback) {
		

		// this.getUserName()

		this.items = this.db.object('/admin/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		// this.items.subscribe(snapshot => {
		// 	console.log(snapshot.key)
		// 	console.log(snapshot.val().userName);
		// 	this.userName = snapshot.val().userName;
			this.feedbackService.AdminFeedback(adminFeedback)
			// snapshot.forEach(snapshot => {
			// 	console.log(snapshot.key);
			// 	console.log(snapshot.val());
				
				
			// });
		// });
	
	}
	// getUserName() {
	// 	console.log('adasd');

	// }
	signOut() {
		this.authService.signOut()
	}
}
