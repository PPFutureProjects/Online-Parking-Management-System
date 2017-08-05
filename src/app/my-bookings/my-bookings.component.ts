import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from "../providers/auth.service";
@Component({
	selector: 'app-my-bookings',
	templateUrl: './my-bookings.component.html',
	styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

	parkingPlazakeyArray: any[] = [];
	parkingPlazaArray: any[] = [];
	ChargedParkingArray: any = []
	CanttStaionArray: any = [];

	fetchAllBookings: FirebaseListObservable<any>;

	fetchParkingPlazaBookings: FirebaseListObservable<any>;
	fetchChargedParkingBookings: FirebaseListObservable<any>;
	fetchCanttStationBookings: FirebaseListObservable<any>;
	fetchParingPlazaForCancel: FirebaseListObservable<any>;
	fetchChargedParkingForCancel : FirebaseListObservable<any>;
	fetchCanttStaionForCancel    : FirebaseListObservable<any>;

	constructor(private db: AngularFireDatabase,
		private afAuth: AngularFireAuth
	) { }

	ngOnInit() {

		this.showBookings()
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

	showBookings() {
		this.fetchParkingPlazaBookings = this.db.list('/parking-plaza/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchChargedParkingBookings = this.db.list('/charged-parking/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchCanttStationBookings = this.db.list('/cantt-station/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });

		this.fetchParkingPlazaBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					this.parkingPlazaObject = {
						parkingName: '',
						uid: '',
						userKey: '',
						selectedDate: '',
						slot: '',
						timeDuration: '',

					}
					console.log(snapshot.key)
					console.log(snapshot.val());

					this.parkingPlazaObject.uid = snapshot.val().uid;
					this.parkingPlazaObject.userKey = snapshot.key;
					this.parkingPlazaObject.selectedDate = snapshot.val().selectedDate;
					this.parkingPlazaObject.slot = snapshot.val().slot;
					this.parkingPlazaObject.timeDuration = snapshot.val().timeDuration;
					this.parkingPlazaObject.parkingName = snapshot.val().place;

					// this.parkingPlazakeyArray.push(snapshot.key);
					console.log(snapshot.val())
					this.parkingPlazaArray.push(this.parkingPlazaObject);
					console.log('111111', this.parkingPlazaArray);

				});
			})

		this.fetchChargedParkingBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					this.chargedParkingObject = {
						parkingName: '',
						uid: '',
						userKey: '',
						selectedDate: '',
						slot: '',
						timeDuration: '',
					}

					console.log(snapshot.key);
					console.log(snapshot.val());

					this.chargedParkingObject.uid = snapshot.val().uid;
					this.chargedParkingObject.userKey = snapshot.key;
					this.chargedParkingObject.selectedDate = snapshot.val().selectedDate;
					this.chargedParkingObject.slot = snapshot.val().slot;
					this.chargedParkingObject.timeDuration = snapshot.val().timeDuration;
					this.chargedParkingObject.parkingName = snapshot.val().place;


					this.ChargedParkingArray.push(this.chargedParkingObject);
					console.log('22222', this.ChargedParkingArray);

				});
			})

		this.fetchCanttStationBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					this.canttStationObject = {
					parkingName: '',
					uid: '',
					userKey: '',
					selectedDate: '',
					slot: '',
					timeDuration: '',
				}
					console.log(snapshot.key)
					console.log(snapshot.val())

					this.canttStationObject.uid = snapshot.val().uid;
					this.canttStationObject.userKey = snapshot.key;
					this.canttStationObject.selectedDate = snapshot.val().selectedDate;
					this.canttStationObject.slot = snapshot.val().slot;
					this.canttStationObject.timeDuration = snapshot.val().timeDuration;
					this.canttStationObject.parkingName = snapshot.val().place;
					this.CanttStaionArray.push(this.canttStationObject);
					console.log('3333', this.CanttStaionArray);

				});
			})



	}
	cancelBookingOfParkingPlaza(date, timeDuration, key) {
		console.log(key);

		console.log(this.parkingPlazaArray);


		this.fetchParingPlazaForCancel = this.db.list('/parking-plaza', { preserveSnapshot: true });
		this.fetchParingPlazaForCancel
			.subscribe(snapshots => {

				snapshots.forEach(snapshot => {

					console.log(snapshot.key)
					console.log(snapshot.val());

					snapshot.forEach(snapshot => {

						console.log(snapshot.key)
						console.log(snapshot.val());
						if (snapshot.key == key) {
							console.log(snapshot.key);
							console.log(snapshot.val());
							this.fetchParkingPlazaBookings.remove(snapshot.key);
							this.parkingPlazaArray = [];

						}
					});
				});
			})

	}
		cancelBookingOfChargedParking(date, timeDuration, key){
            
		this.fetchChargedParkingForCancel = this.db.list('/charged-parking', { preserveSnapshot: true });
		this.fetchChargedParkingForCancel
			.subscribe(snapshots => {

				snapshots.forEach(snapshot => {

					console.log(snapshot.key)
					console.log(snapshot.val());

					snapshot.forEach(snapshot => {

						console.log(snapshot.key)
						console.log(snapshot.val());
						if (snapshot.key == key) {
							console.log(snapshot.key);
							console.log(snapshot.val());
							this.fetchChargedParkingBookings.remove(snapshot.key);
							this.ChargedParkingArray = [];

						}
					});
				});
			})
		}
    cancelBookingForCanttStation(date, timeDuration, key){
		console.log(this.CanttStaionArray);


		this.fetchCanttStaionForCancel = this.db.list('/cantt-station', { preserveSnapshot: true });
		this.fetchCanttStaionForCancel
			.subscribe(snapshots => {

				snapshots.forEach(snapshot => {

					console.log(snapshot.key)
					console.log(snapshot.val());

					snapshot.forEach(snapshot => {

						console.log(snapshot.key)
						console.log(snapshot.val());
						if (snapshot.key == key) {
							console.log(snapshot.key);
							console.log(snapshot.val());
							this.fetchCanttStationBookings.remove(snapshot.key);
							this.CanttStaionArray = [];

						}
					});
				});
			})

	}
}
