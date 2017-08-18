import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { AuthService } from "../providers/auth.service";
import { FeedbackService } from "../providers/feedback.service";


@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
	items: FirebaseObjectObservable<any>;
	fetchUserChat: FirebaseListObservable<any>;
	userName;

	constructor(private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private feedbackService: FeedbackService,
		private authService: AuthService) { }

	ngOnInit() {
		this.fetchUserChat = this.db.list('feedback/' + this.authService.currentUserId);
	}

userFeedback;
	submitFeedback(userFeedback) {

		this.items = this.db.object('/users/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.items.subscribe(snapshot => {
			// console.log(snapshot.key)
			// console.log(snapshot.val().userName);
			this.userName = snapshot.val().userName;
			if(userFeedback.length > 0)
			this.feedbackService.userFeedback(userFeedback, this.userName)
			userFeedback = "";


		});

	}

	signOut() {
		this.authService.signOut()
	}
}
