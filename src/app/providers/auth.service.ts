import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

	authState: any = null;
	localStorage;
	storage;
	adminUid;
	sendSignupData: FirebaseListObservable<any>;

	constructor(private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private router: Router) {

		this.afAuth.authState.subscribe((auth) => {
			this.authState = auth;
			// console.log(this.authState);

		});
	}


	get authenticated(): boolean {
		return this.authState !== null;
	}

	// Returns current user data
	get currentUser(): any {
		return this.authenticated ? this.authState : null;
	}

	// Returns
	get currentUserObservable(): any {
		return this.afAuth.authState
	}

	// Returns current user UID
	get currentUserId(): string {
		return this.authenticated ? this.authState.uid : '';
	}



	userSignup(signupData) {

		//// Email/Password Auth ////
		return this.afAuth.auth.createUserWithEmailAndPassword(signupData.userEmail, signupData.userPassword)
			.then((user) => {
				this.authState = user;
				console.log(this.currentUser)
				this.sendSignupData = this.db.list('users');
				this.sendSignupData.update(this.currentUserId, signupData);

				localStorage.setItem('userEmail', signupData.userEmail);
				localStorage.setItem('userName', signupData.userName);
				this.router.navigate(['dashboard'])
			})
			.catch(error => console.log(error));


	}

	emailLogin(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				this.authState = user;
				console.log(this.authState);

				this.adminUid = this.afAuth.auth.currentUser.uid;
				if (this.adminUid == 'D6JNpT6cTtfOilIKV7cp3u1tsP42') {
					this.router.navigate(['/admin'])
                    localStorage.setItem('adminUid', this.adminUid);
				}
				else if(this.adminUid !== 'D6JNpT6cTtfOilIKV7cp3u1tsP42'){
                localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
				this.storage = localStorage.getItem('firebaseToken');
				console.log(this.storage);


				this.router.navigate(['/dashboard']);
				}

				

			})
			.catch(error => console.log(error));
	}

	signOut() {
		this.afAuth.auth.signOut();

		localStorage.removeItem('userEmail');
		localStorage.removeItem('userName');
		localStorage.removeItem('firebaseToken');

		//remove uid from admin portal
		localStorage.removeItem('adminUid')

		this.router.navigate(['/app-login'])
	}

}
