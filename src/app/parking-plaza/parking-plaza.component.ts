import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';




import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
@Component({
	selector: 'parking-plaza',
	templateUrl: './parking-plaza.component.html',
	styleUrls: ['./parking-plaza.component.css']
})
export class ParkingPlazaComponent implements OnInit {


	parkingPlazaForm: FormGroup;

	
	year;
	minDate = new Date();
	showParkingPlaza = true;
	currentBookingKey;
	// var of all users
	allUsersSelectedDate;
	allUsersTimeDuration;
	allUsersStartTime;
	allUsersEndTime;
	currentNode;
	userUid;
	allUserstimeDateAndSlotArray = [];
	userBookingArray = [];

	// var of current user
	date;
	initializeTime;
	reservedHours;
	totalBookingHours;
	TimeDuration;
	slot;
	slotNumber;
	allSlots;

    items: FirebaseListObservable<any>;
	sendUserBookingData: FirebaseListObservable<any>;
	fetchAllUsers: FirebaseObjectObservable<any>;
	fetchBooking: FirebaseListObservable<any>;
	fetchBookingForCancel: FirebaseListObservable<any>;


	times = [
		{ value: '9:00', viewValue: '9:00' },
		{ value: '10:00', viewValue: '10:00' },
		{ value: '11:00', viewValue: '11:00' },
		{ value: '12:00', viewValue: '12:00' },
		{ value: '13:00', viewValue: '13:00' },
		{ value: '14:00', viewValue: '14:00' },
		{ value: '15:00', viewValue: '15:00' },
		{ value: '16:00', viewValue: '16:00' },
		{ value: '17:00', viewValue: '17:00' },
		{ value: '18:00', viewValue: '18:00' },
		{ value: '19:00', viewValue: '19:00' },
		{ value: '20:00', viewValue: '20:00' },
		{ value: '21:00', viewValue: '21:00' }
	];

	reserved_hours = [
		{ value: '1-hour', viewValue: '1 hour' },
		{ value: '2-hours', viewValue: '2 hours' },
		{ value: '3-hours', viewValue: '3 hours' },
		{ value: '4-hours', viewValue: '4 hours' },
		{ value: '5-hours', viewValue: '5 hours' },
		{ value: '6-hours', viewValue: '6 hours' },
		{ value: '7-hours', viewValue: '7 hours' }
	];

	buttons = [
		{ reserved: false, slotNumber: 1 },
		{ reserved: false, slotNumber: 2 },
		{ reserved: false, slotNumber: 3 },
		{ reserved: false, slotNumber: 4 },
		{ reserved: false, slotNumber: 5 },
		{ reserved: false, slotNumber: 6 },
		{ reserved: false, slotNumber: 7 },
		{ reserved: false, slotNumber: 8 },
		{ reserved: false, slotNumber: 9 },
		{ reserved: false, slotNumber: 10 },

	]
	newvalue;

	constructor(private fb: FormBuilder,
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private authService: AuthService,
		private router: Router,
	) {

		this.parkingPlazaForm = this.fb.group({
			timeOptions: '',
			reservedHoursOptions: '',
			dateOptions: '',
		});

	}
	ngOnInit() { }


	submit() {
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].reserved = false;
		}


		// console.log("formmmmm", this.parkingPlazaForm.value);
		this.date = this.parkingPlazaForm.value.dateOptions.toString();
		this.date = this.date.slice(4, 15);
		// console.log("dateeee", this.date);
		this.initializeTime = parseInt(this.parkingPlazaForm.value.timeOptions);
		this.reservedHours = parseInt(this.parkingPlazaForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;
		// console.log("bookinggggg", this.totalBookingHours);

		this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
		// console.log(this.allUserstimeDateAndSlotArray);
		this.fetchAllUsers = this.db.object('/parking-plaza', { preserveSnapshot: true });
		this.fetchAllUsers.subscribe(snapshots => {
			snapshots.forEach(element => {
				// console.log("keyyyyyy", element.key);
				element.forEach(snapshot => {
					// console.log("snapshottt", snapshot.key);
					//	console.log("valueeee",snapshot.val());
					if (this.date == snapshot.val().selectedDate) {
						// console.log('if1');
						if (this.initializeTime == snapshot.val().startTime) {
							// console.log('if2');
							//  console.log(snapshot.val());

							this.buttons[(snapshot.val().slot - 1)].reserved = true;
						}
						else if (this.initializeTime != snapshot.val().startTime) {
							// console.log('if2 else');
							if ((snapshot.val().startTime > this.initializeTime && this.totalBookingHours > snapshot.val().startTime) || (this.initializeTime > snapshot.val().startTime && this.initializeTime < snapshot.val().endTime)) {
								// console.log('if3');
								this.buttons[(snapshot.val().slot - 1)].reserved = true;
							}
						}

					}
				});
			});
			this.showParkingPlaza = false;
			this.allSlots = true;
		})

	}

	
	isTime = false;
	isReservedHours = false;
	isSubmitButton = false;





	

	onDateChange(event: Event) {

		// console.log(event);


		this.isTime = true;
	}
	onTimeChange(event: Event) {
		this.isReservedHours = true;

	}

	onReservedHrsChange(event: Event) {
		this.isSubmitButton = true;
	}


	back() {

		this.allSlots = false;
		this.showParkingPlaza = true;
	}
	

	obj: {
		date: '',
		slotNum: '',
		timeDuration: '',
	}

	slots(slotNumber) {
		
		this.obj = { date: '', slotNum: '', timeDuration: '' };
		this.slotNumber = slotNumber
		// localStorage.setItem('slot', this.slotNumber);
		// console.log(this.parkingPlazaForm.value);
		// console.log(this.slot);
		// console.log(this.times[4].viewValue);
		this.date = this.parkingPlazaForm.value.dateOptions.toString();
		this.date = this.date.slice(4, 15);
		this.initializeTime = parseInt(this.parkingPlazaForm.value.timeOptions);
		this.reservedHours = parseInt(this.parkingPlazaForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;

		this.TimeDuration = this.initializeTime + ":00 " + " to " + this.totalBookingHours + ":00 ";
		this.currentNode = 'parking-plaza';
		this.userUid = this.afAuth.auth.currentUser.uid;

		this.sendUserBookingData = this.db.list('parking-plaza' + "/" + this.afAuth.auth.currentUser.uid);
		this.sendUserBookingData.push({
			slotBook: false, place: 'parking-plaza', uid: this.afAuth.auth.currentUser.uid, selectedDate: this.date,
			startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotNumber
		})

		this.showParkingPlaza = false;

		this.obj.date = this.date;
		this.obj.slotNum = slotNumber;
		this.obj.timeDuration = this.TimeDuration;
		
		this.userBookingArray.push(this.obj);
	

		this.getCurrentBooking(this.date, this.TimeDuration);
		this.allSlots = false;
		this.router.navigate(['/dashboard/app-my-bookings'])

	}

	getCurrentBooking(date, timeDuration) {


		this.fetchBooking = this.db.list('parking-plaza/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchBooking
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					// console.log(snapshot.key);
					if (snapshot.val().selectedDate == date && snapshot.val().timeDuration == timeDuration) {
						// Current booking key
						this.currentBookingKey = snapshot.key
						// console.log(snapshot.key);
						// console.log(snapshot.val())
					}
				});
			});


	}

	signOut() {
		this.authService.signOut();
	}

}










