import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";

@Injectable()
export class FeedbackService implements OnInit {
	items: FirebaseListObservable<any>;
	adminFeedback: FirebaseListObservable<any>;
	fetchAdminUserChat: FirebaseListObservable<any>;
	selectedUserUid;
	chatMessages = [];
	chatUserNames = [];

	constructor(private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private authService: AuthService) {



	}


	ngOnInit() {


	}


	userFeedback(userFeedback, userName) {
		console.log(userName);
		//   ;

		this.items = this.db.list('feedback/');
		this.items.update(this.authService.currentUserId, { name: userName, uid: this.authService.currentUserId })
		this.items = this.db.list('feedback/' + this.authService.currentUserId);
		this.items.push({ message: userFeedback, name: userName, type: 'user' })
		console.log(userFeedback);
	}

	AdminFeedback(feedback, selectedUser) {
		this.selectedUserUid = selectedUser;
		this.adminFeedback = this.db.list('feedback/' + selectedUser);
		this.adminFeedback.push({ message: feedback, name: 'Admin', type: 'admin' });

		this.fetchChat()

	}

	fetchChat() {
		this.fetchAdminUserChat = this.db.list('feedback/' + this.selectedUserUid, { preserveSnapshot: true });
		this.fetchAdminUserChat
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val().name)
					this.chatUserNames.push(snapshot.val().name);
					this.chatMessages.push(snapshot.val().message);
					
				});
				
			})

	   
		}
	get getChatUserName(): any {
		console.log(this.chatUserNames);
	
		return this.chatUserNames;
   }
	get getChatMessages(): any {
		return this.chatMessages;
	}



}
