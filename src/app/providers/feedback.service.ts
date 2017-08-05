import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";

@Injectable()
export class FeedbackService implements OnInit  {
	items: FirebaseListObservable<any>;
	adminFeedback: FirebaseListObservable<any>;

	constructor(private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private authService: AuthService) {
			console.log('asdasdasdasd');
      
			
		 }
	

	ngOnInit() {
		
		
	}


	userFeedback(userFeedback, userName) {
		console.log(userName);
		//   ;

		this.items = this.db.list('feedback/' + this.afAuth.auth.currentUser.uid);
		this.items.push({ message: userFeedback, name: userName, type: 'user' })
		console.log(userFeedback);
	}

	AdminFeedback(feedback) {
		this.adminFeedback = this.db.list('feedback/' + this.afAuth.auth.currentUser.uid);
		this.adminFeedback.push({ message: feedback, name: 'Admin', type: 'admin' })
		// console.log(userFeedback);
	}

}
