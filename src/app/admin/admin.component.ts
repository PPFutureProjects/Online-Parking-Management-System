import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	// parkingPlazakeyArray: any[] = [];
	parkingPlazaArray: any[] = [];
	ChargedParkingArray: any = []
	CanttStaionArray: any = [];

	fetchAllBookings: FirebaseListObservable<any>;

	fetchParkingPlazaBookings: FirebaseListObservable<any>;
	fetchChargedParkingBookings: FirebaseListObservable<any>;
	fetchCanttStationBookings: FirebaseListObservable<any>;
	fetchParingPlazaForCancel: FirebaseListObservable<any>;
	fetchChargedParkingForCancel: FirebaseListObservable<any>;
	fetchCanttStaionForCancel: FirebaseListObservable<any>;


	constructor(private authService: AuthService,
		private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
	) { }

	ngOnInit() {

		this.showAllUserBookings()

	}

	parkingPlazaObject = {
		parkingName: '',
		uid: '',
		userKey: '',
		selectedDate: '',
		slot: '',
		timeDuration: '',

	}

	chargedParkingObject = {
		parkingName: '',
		uid: '',
		userKey: '',
		selectedDate: '',
		slot: '',
		timeDuration: '',
	}

	canttStationObject = {
		parkingName: '',
		uid: '',
		userKey: '',
		selectedDate: '',
		slot: '',
		timeDuration: '',
	}
	showAllUserBookings() {
		this.fetchParkingPlazaBookings = this.db.list('/parking-plaza/', { preserveSnapshot: true });
		this.fetchChargedParkingBookings = this.db.list('/charged-parking/', { preserveSnapshot: true });
		this.fetchCanttStationBookings = this.db.list('/cantt-station/', { preserveSnapshot: true });

		this.fetchParkingPlazaBookings
			.subscribe(snapshots => {
				this.parkingPlazaArray = [];
				snapshots.forEach(snapshot => {

					// console.log(snapshot.key)
					// console.log(snapshot.val());
					snapshot.forEach((snapshot) => {
						this.parkingPlazaObject = {
							parkingName: '',
							uid: '',
							userKey: '',
							selectedDate: '',
							slot: '',
							timeDuration: '',

						}
						// console.log(snapshot.key);
						// console.log(snapshot.val());


						this.parkingPlazaObject.uid = snapshot.val().uid;
						this.parkingPlazaObject.userKey = snapshot.key;
						this.parkingPlazaObject.selectedDate = snapshot.val().selectedDate;
						this.parkingPlazaObject.slot = snapshot.val().slot;
						this.parkingPlazaObject.timeDuration = snapshot.val().timeDuration;
						this.parkingPlazaObject.parkingName = snapshot.val().place;

						// this.parkingPlazakeyArray.push(snapshot.key);
						// console.log(snapshot.val())
						this.parkingPlazaArray.push(this.parkingPlazaObject);
						// console.log('111111', this.parkingPlazaArray);

					})
					// console.log(snapshot.val().uid);

				});
			})

		// 	});
		// })

		this.fetchChargedParkingBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
                   this.ChargedParkingArray = [];
					// console.log(snapshot.key);
					// console.log(snapshot.val());

					snapshot.forEach((snapshot) => {
						this.chargedParkingObject = {
							parkingName: '',
							uid: '',
							userKey: '',
							selectedDate: '',
							slot: '',
							timeDuration: '',
						}

						// console.log(snapshot.key);
						// console.log(snapshot.val());


						this.chargedParkingObject.uid = snapshot.val().uid;
						this.chargedParkingObject.userKey = snapshot.key;
						this.chargedParkingObject.selectedDate = snapshot.val().selectedDate;
						this.chargedParkingObject.slot = snapshot.val().slot;
						this.chargedParkingObject.timeDuration = snapshot.val().timeDuration;
						this.chargedParkingObject.parkingName = snapshot.val().place;


						this.ChargedParkingArray.push(this.chargedParkingObject);
						// console.log('22222', this.ChargedParkingArray);
					})



				});
			})

		this.fetchCanttStationBookings
			.subscribe(snapshots => {
				this.CanttStaionArray = [];
				snapshots.forEach(snapshot => {
                // console.log(snapshot.key)
				// console.log(snapshot.val())

				snapshot.forEach((snapshot) => {
				this.canttStationObject = {
					parkingName: '',
					uid: '',
					userKey: '',
					selectedDate: '',
					slot: '',
					timeDuration: '',
				}
				// console.log(snapshot.key);
				// console.log(snapshot.val());
					
			
					this.canttStationObject.uid = snapshot.val().uid;
					this.canttStationObject.userKey = snapshot.key;
					this.canttStationObject.selectedDate = snapshot.val().selectedDate;
					this.canttStationObject.slot = snapshot.val().slot;
					this.canttStationObject.timeDuration = snapshot.val().timeDuration;
					this.canttStationObject.parkingName = snapshot.val().place;
					this.CanttStaionArray.push(this.canttStationObject);
					// console.log('3333', this.CanttStaionArray);

					})
				})
			})



	}

	cancelBookingOfParkingPlaza(date, timeDuration, key,uid) {
		// console.log(key);

		// console.log(this.parkingPlazaArray);


		this.fetchParingPlazaForCancel = this.db.list('/parking-plaza/' + uid, { preserveSnapshot: true });
		this.fetchParingPlazaForCancel.remove(key);
		

	}

	cancelBookingOfChargedParking(date, timeDuration, key,uid) {

		this.fetchChargedParkingForCancel = this.db.list('/charged-parking/' + uid ,{ preserveSnapshot: true });
		this.fetchChargedParkingForCancel.remove(key);
	
	}

	cancelBookingForCanttStation(date, timeDuration, key, uid){
		// console.log(uid);
		// console.log(key);
		
		
		this.fetchCanttStaionForCancel = this.db.list('/cantt-station/' + uid , { preserveSnapshot: true });
		this.fetchCanttStaionForCancel.remove(key);
		// this.fetchCanttStaionForCancel
		// 	.subscribe(snapshots => {
		// 			snapshots.forEach(snapshot => {

		// 				console.log(snapshot.key)
		// 				console.log(snapshot.val());
		// 				this.fetchCanttStationBookings.remove(snapshot.key);
		// 				// if (snapshot.key == key) {
		// 				// 	console.log(snapshot.key);
		// 				// 	console.log(snapshot.val());
		// 				// 	this.fetchCanttStationBookings.remove(snapshot.key);
							

		// 				// }
		// 			});

		// 	})
	}

	signOut() {
		this.authService.signOut();
	}


}
