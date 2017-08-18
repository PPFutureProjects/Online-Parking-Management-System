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
	fetchFeedback: FirebaseListObservable<any>;
	userName;
	adminName;
	adminMessage;
	adminType;
	usersUid;
	selectedUser;
	showChat = false
	showFeedbackUsers = true;
	showFeedBack = false;
	userDataArray = [];
	adminDataArray = [];
	usersArray = [];
	showUsers: FirebaseListObservable<any>;

	showCurrentUserChat: FirebaseListObservable<any>;
	
	constructor(private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private feedbackService: FeedbackService,
		private authService: AuthService) { }

	ngOnInit() {
		this.showFeedback();

	let a = this.feedbackService.getChatUserName
	console.log(a);

	let b = this.feedbackService.getChatMessages
    console.log(b);
		
	
	}

	showFeedback() {


		this.showUsers = this.db.list('/feedback', { preserveSnapshot: true });
		this.showUsers
			.subscribe(snapshots => {
				this.usersArray = []
				snapshots.forEach(snapshot => {
					// users uid in feedback
					console.log(snapshot.key)
					this.usersUid = snapshot.key;
					console.log(snapshot.val());
					this.usersArray.push(snapshot.val())
					console.log(this.usersArray);

					snapshot.forEach(snapshot => {

						console.log(snapshot.key)
						this.usersUid = snapshot.key;
						console.log(snapshot.val());
						// this.usersArray.push(snapshot.val())


					})

				});
			})

		this.fetchFeedback = this.db.list('feedback/', { preserveSnapshot: true });


	}

	message(uid) {
		this.showFeedbackUsers = false;
		this.showChat = true
		this.selectedUser = uid;
		this.showCurrentUserChat = this.db.list('feedback/'+ uid);

	}
	submitFeedback(adminFeedback) {



		// this.getUserName()

		// this.items = this.db.object('/admin/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		// this.items.subscribe(snapshot => {
		// 	console.log(snapshot.key)
		// 	console.log(snapshot.val().userName);
		// 	this.userName = snapshot.val().userName;
		this.feedbackService.AdminFeedback(adminFeedback, this.selectedUser)
		// snapshot.forEach(snapshot => {
		// 	console.log(snapshot.key);
		// 	console.log(snapshot.val());


		// });
		// });

	}
	back() {
		this.showFeedbackUsers = true;
		this.showChat = false;
	}
	// getUserName() {
	// 	console.log('adasd');

	// }
	signOut() {
		this.authService.signOut()
	}
}
