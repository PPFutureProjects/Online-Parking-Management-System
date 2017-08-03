import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
	selector: 'app-my-bookings',
	templateUrl: './my-bookings.component.html',
	styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

	parkingPlazaArray   : any[] = [];
	ChargedParkingArray : any = []
	CanttStaionArray    : any = [];
	                  
	fetchAllBookings: FirebaseListObservable<any>;

    fetchParkingPlazaBookings : FirebaseListObservable<any>;
	fetchChargedParkingBookings : FirebaseListObservable<any>;
	fetchCanttStationBookings  : FirebaseListObservable<any>;


	constructor(private db: AngularFireDatabase,
	            private afAuth : AngularFireAuth
	) { }

	ngOnInit() {

		this.showBookings()
	}
	showBookings() {
		this.fetchParkingPlazaBookings = this.db.list('/parking-plaza/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchChargedParkingBookings = this.db.list('/charged-parking/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchCanttStationBookings  = this.db.list('/cantt-station/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		
		this.fetchParkingPlazaBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val())
					this.parkingPlazaArray.push(snapshot.val());
					console.log('111111',this.parkingPlazaArray);
					
				});
			})

			this.fetchChargedParkingBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					console.log(snapshot.val());
					this.ChargedParkingArray.push(snapshot.val());
					console.log('22222',this.ChargedParkingArray);
					
				});
			})

			this.fetchCanttStationBookings
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val())
					this.CanttStaionArray.push(snapshot.val());
					console.log('3333',this.CanttStaionArray);
					
				});
			})
			
         
		   
	}
//    cancelBookingOfParkingPlaza(date,timeDuration)
}
