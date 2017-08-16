import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
@Component({
	selector: 'charged-parking',
	templateUrl: './charged-parking.component.html',
	styleUrls: ['./charged-parking.component.css']
})
export class ChargedParkingComponent implements OnInit {

	chargedParkingForm: FormGroup;
	minDate = new Date();
	items: FirebaseListObservable<any>;
	// var of all users
	allUsersSelectedDate;
	allUsersTimeDuration;
	allUsersStartTime;
	allUsersEndTime;
	allUserstimeDateAndSlotArray = [];

	// var of current user
	date;
	initializeTime;
	reservedHours;
	totalBookingHours;
	TimeDuration;
	slot;

	allSlots;
	month;

	// var of slots Func
	sendUserBookingData: FirebaseListObservable<any>;
	fetchBooking: FirebaseListObservable<any>;
	fetchAllUsers: FirebaseObjectObservable<any>;

	showChargedPlaza = true;
	showCurrentBooking = false;
	fetchBookingForCancel: FirebaseListObservable<any>
	currentBookingKey;
	userBookingArray = [];

	times = [
		{ value: '9-am', viewValue: '9:00' },
		{ value: '10-am', viewValue: '10:00' },
		{ value: '11-am', viewValue: '11:00' },
		{ value: '12-am', viewValue: '12:00' },
		{ value: '1-pm', viewValue: '13:00' },
		{ value: '2-pm', viewValue: '14:00' },
		{ value: '3-pm', viewValue: '15:00' },
		{ value: '4-pm', viewValue: '16:00' },
		{ value: '5-pm', viewValue: '17:00' },
		{ value: '6-pm', viewValue: '18:00' },
		{ value: '7-pm', viewValue: '19:00' },
		{ value: '8-pm', viewValue: '20:00' },
		{ value: '9-pm', viewValue: '21:00' }
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


	constructor(private fb: FormBuilder,
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private authService: AuthService,
		private router: Router,
	) {
    this.chargedParkingForm = this.fb.group({
			timeOptions: '',
			reservedHoursOptions: '',
			dateOptions: '',

		});

	}

	ngOnInit() {

		// this.chargedParkingForm = this.fb.group({
		// 	timeOptions: '',
		// 	reservedHoursOptions: '',
		// 	dateOptions: '',

		// });

		// this.fetchAllUsers = this.db.object('charged-parking', { preserveSnapshot: true });
		// this.fetchAllUsers
		// 	.subscribe(snapshots => {
		// 		snapshots.forEach(snapshot => {
		// 			// all users uid
		// 			console.log(snapshot.key)
		// 			console.log(snapshot.val())

		// 			snapshot.forEach(snapshot => {

		// 				console.log(snapshot.key)
		// 				console.log(snapshot.val())
		// 				this.allUsersSelectedDate = snapshot.val().selectedDate;
		// 				this.allUsersStartTime = snapshot.val().startTime
		// 				this.allUsersEndTime = snapshot.val().endTime
		// 				this.allUsersTimeDuration = snapshot.val().timeDuration;
		// 				this.allUserstimeDateAndSlotArray.push(this.allUsersSelectedDate, this.allUsersTimeDuration, snapshot.val().slot, this.allUsersStartTime, this.allUsersEndTime)


		// 			});
		// 		});
		// 	})

	}

	isTime = false;
	isReservedHours = false;
	isSubmitButton = false;

	onDateChange(event: Event) {
		
		console.log(event);


		this.isTime = true;
	}
	onTimeChange(event: Event) {
		this.isReservedHours = true;

	}

	onReservedHrsChange(event: Event) {
		this.isSubmitButton = true;
	}




	submit() {
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].reserved = false;
		}

			
		console.log("formmmmm",this.chargedParkingForm.value);
		// this.date = this.demoForm.value.dateOptions.getMonth() + 1 + "-" + this.demoForm.value.dateOptions.getDate() + "-" + this.demoForm.value.dateOptions.getYear();
		this.date = this.chargedParkingForm.value.dateOptions.toString();
		this.date = this.date.slice(4, 15);
		 console.log("dateeee",this.date);
		  this.initializeTime = parseInt(this.chargedParkingForm.value.timeOptions);
		this.reservedHours = parseInt(this.chargedParkingForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;
		console.log("bookinggggg",this.totalBookingHours);

		this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
		console.log(this.allUserstimeDateAndSlotArray);
		this.fetchAllUsers = this.db.object('/charged-parking', { preserveSnapshot: true });
		this.fetchAllUsers.subscribe(snapshots =>{
			snapshots.forEach(element => {
				console.log("keyyyyyy",element.key);
				element.forEach(snapshot => {
					console.log("snapshottt",snapshot.key);
				//	console.log("valueeee",snapshot.val());
					if (this.date == snapshot.val().selectedDate){
						console.log('if1');
						 if (this.initializeTime == snapshot.val().startTime){
							 console.log('if2');
							//  console.log(snapshot.val());
							  
							  this.buttons[(snapshot.val().slot-1)].reserved = true;
						 }
						else if (this.initializeTime != snapshot.val().startTime){
							 console.log('if2 else');
							 if ((snapshot.val().startTime > this.initializeTime && this.totalBookingHours > snapshot.val().startTime) || (this.initializeTime > snapshot.val().startTime   && this.initializeTime < snapshot.val().endTime)){
								console.log('if3');
							  this.buttons[(snapshot.val().slot-1)].reserved = true;
							 }
						}
						
					}
				});
			});
		this.showChargedPlaza = false;
		 this.allSlots = true;
		})

	}
		back() {

		this.chargedParkingForm = this.fb.group({
			timeOptions: '',
			reservedHoursOptions: '',
			dateOptions: '',

		});
		this.allSlots = false;
		this.showChargedPlaza = true;

	}
		backAgain(){
    this.showCurrentBooking = false;
    this.allSlots = true;	
}
	obj: {
		date: '',
		slotNum: '',
		timeDuration: '',
	}
	slots(slotNumber) {
		this.obj = { date: '', slotNum: '', timeDuration: '' };
		console.log(this.chargedParkingForm.value);

		// this.date = parseInt(this.demoForm.value.dateOptions);
		// this.date = this.chargedParkingForm.value.dateOptions.getMonth() + 1 + "-" + this.chargedParkingForm.value.dateOptions.getDate() + "-" + this.chargedParkingForm.value.dateOptions.getYear();
		this.date = this.chargedParkingForm.value.dateOptions.toString();
		this.date = this.date.slice(4, 15);
		this.initializeTime = parseInt(this.chargedParkingForm.value.timeOptions);
		this.reservedHours = parseInt(this.chargedParkingForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;

		this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;

		this.sendUserBookingData = this.db.list('charged-parking' + "/" + this.afAuth.auth.currentUser.uid);
		this.sendUserBookingData.push({
			place : 'charged-parking',uid: this.afAuth.auth.currentUser.uid, selectedDate: this.date,
			startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotNumber
		})

		this.showChargedPlaza = false;
		this.showCurrentBooking = true;

		this.obj.date = this.date;
		this.obj.slotNum = slotNumber;
		this.obj.timeDuration = this.TimeDuration;

		this.userBookingArray.push(this.obj);
		this.getCurrentBooking(this.date, this.TimeDuration);
		this.allSlots = false;
	}


	getCurrentBooking(date, timeDuration) {


		this.fetchBooking = this.db.list('charged-parking/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchBooking
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					if (snapshot.val().selectedDate == date && snapshot.val().timeDuration == timeDuration) {
						// Current booking key
						this.currentBookingKey = snapshot.key
						console.log(snapshot.key);
						console.log(snapshot.val())
					}
				});
			});


	}
	cancelBooking() {

		this.fetchBookingForCancel = this.db.list('charged-parking/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchBookingForCancel
			.subscribe(snapshots => {
				this.userBookingArray = [];
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val())
					if (snapshot.key == this.currentBookingKey) {
						console.log(snapshot.key);
						console.log(snapshot.val());
						this.fetchBookingForCancel.remove(snapshot.key)



					}
				});
			})
			this.allSlots = false;
		setTimeout(() => {

			this.router.navigate(['dashboard'])
		}, 1000)
	}

	signOut() {
		this.authService.signOut();
	}
}