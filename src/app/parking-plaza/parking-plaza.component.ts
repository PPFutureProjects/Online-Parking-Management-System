import { Component, OnInit } from '@angular/core';
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

	demoForm: FormGroup;
	// selectedDate;
	// timeOption;
	// reservedHours;
	// totalBookingHours;
	// inBetweenTime;
	// endTime;
	// isSlot1 = true;
	// arr = [];
	// selectedDateArray = [];
	// timeDuration;
	// userUid;
	// allUsersTimeAndDate;
	// currentUserKey;
	// isDisabled = false;
	// slot;
	// allSlots = false;
	// currentUserSelectedDate;
	// currentUserTimeDuration;
	// currentUserOfParkingPlaza: FirebaseObjectObservable<any>;
	// fetchDataOfParkingPlaza: FirebaseListObservable<any>

	items: FirebaseListObservable<any>;
	year;
	minDate = new Date();
	showCurrentBooking = false;
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
	month;

	// var of slots Func
	sendUserBookingData: FirebaseListObservable<any>;
	fetchAllUsers: FirebaseObjectObservable<any>;
	fetchBooking: FirebaseListObservable<any>;
	fetchBookingForCancel: FirebaseListObservable<any>;

	// dates = [
	// 	{ value: "270717", viewValue: '27-07-17' },
	// 	{ value: '280717', viewValue: '28/07/17' },
	// 	{ value: '290717', viewValue: '29/07/17' },
	// 	{ value: '300717', viewValue: '30/07/17' }
	// ];

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
		{ reserved: false, slotNumber: 5 }
	]


	constructor(private fb: FormBuilder,
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private authService: AuthService,
		private router: Router,
	) {

	}

	ngOnInit() {

		this.demoForm = this.fb.group({
			timeOptions: '',
			reservedHoursOptions: '',
			dateOptions: '',

		});

		this.fetchAllUsers = this.db.object('parking-plaza', { preserveSnapshot: true });
		this.fetchAllUsers
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					// all users uid
					console.log(snapshot.key)
					console.log(snapshot.val())

					snapshot.forEach(snapshot => {

						console.log(snapshot.key)
						console.log(snapshot.val())
						this.allUsersSelectedDate = snapshot.val().selectedDate;
						this.allUsersStartTime = snapshot.val().startTime
						this.allUsersEndTime = snapshot.val().endTime
						this.allUsersTimeDuration = snapshot.val().timeDuration;
						this.allUserstimeDateAndSlotArray.push(this.allUsersSelectedDate, this.allUsersTimeDuration, snapshot.val().slot, this.allUsersStartTime, this.allUsersEndTime)


					});
				});
			})

	}
demo = true;		
onHeroChange(event : Event){
console.log(event);
this.demo = false;
}


	submit() {
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].reserved = false;
		}
		console.log(this.demoForm.value);
		console.log(this.demoForm.value.dateOptions.getMonth() + 1)
		console.log(this.demoForm.value.dateOptions.getDate());
		console.log(this.demoForm.value.dateOptions.getYear());
		this.year = this.demoForm.value.dateOptions.getYear() ;
		console.log(this.year);
		
		// this.date = this.demoForm.value.dateOptions.getMonth() + 1 + "-" + this.demoForm.value.dateOptions.getDate() + "-" + this.demoForm.value.dateOptions.getYear();
		
		this.date = this.demoForm.value.dateOptions.toString();
		console.log('date ! ' , this.date);
		this.date = this.date.slice(4, 15);
		console.log(this.date);
		this.initializeTime = parseInt(this.demoForm.value.timeOptions);
		this.reservedHours = parseInt(this.demoForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;

		this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
		console.log(this.allUserstimeDateAndSlotArray);

		for (let i = 0; i < this.allUserstimeDateAndSlotArray.length; i++) {
			if (this.allUserstimeDateAndSlotArray[i] == this.date) {
				console.log('1111111111')
				if ((this.initializeTime >= this.allUserstimeDateAndSlotArray[i + 3] &&
					this.initializeTime < this.allUserstimeDateAndSlotArray[i + 4])
					||
					(this.totalBookingHours <= this.allUserstimeDateAndSlotArray[i + 4] &&
						this.totalBookingHours > this.allUserstimeDateAndSlotArray[i + 3])
				) {

					console.log(this.allUserstimeDateAndSlotArray[i + 2]);
					this.slot = this.allUserstimeDateAndSlotArray[i + 2];

					this.buttons[this.slot - 1].reserved = true;
				}


				else if ((this.initializeTime < this.allUserstimeDateAndSlotArray[i + 3])
					&&
					this.totalBookingHours > this.allUserstimeDateAndSlotArray[i + 4]
				) {
					console.log(this.allUserstimeDateAndSlotArray[i + 2]);
					this.slot = this.allUserstimeDateAndSlotArray[i + 2];

					this.buttons[this.slot - 1].reserved = true;
				}
			}
		}
		this.allSlots = true;


	}
	obj: {
		date: '',
		slotNum: '',
		timeDuration: '',
	}

	slots(slotNumber) {
		this.obj = { date: '', slotNum: '', timeDuration: '' };
		this.slotNumber = slotNumber
		console.log(this.demoForm.value);
		console.log(this.slot);
		console.log(this.times[4].viewValue);

		// this.date = parseInt(this.demoForm.value.dateOptions);
		// this.date = this.demoForm.value.dateOptions.getMonth() + 1 + "-" + this.demoForm.value.dateOptions.getDate() + "-" + this.demoForm.value.dateOptions.getYear();
		this.date = this.demoForm.value.dateOptions.toString();
		this.date = this.date.slice(4, 15);
		this.initializeTime = parseInt(this.demoForm.value.timeOptions);
		this.reservedHours = parseInt(this.demoForm.value.reservedHoursOptions);
		this.totalBookingHours = this.initializeTime + this.reservedHours;

		this.TimeDuration = this.initializeTime + ":00 " + " to " + this.totalBookingHours + ":00 ";
		this.currentNode = 'parking-plaza';
		this.userUid = this.afAuth.auth.currentUser.uid;

		this.sendUserBookingData = this.db.list('parking-plaza' + "/" + this.afAuth.auth.currentUser.uid);
		this.sendUserBookingData.push({
			place: 'parking-plaza', uid: this.afAuth.auth.currentUser.uid, selectedDate: this.date,
			startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotNumber
		})

		this.showParkingPlaza = false;
		this.showCurrentBooking = true;

		this.obj.date = this.date;
		this.obj.slotNum = slotNumber;
		this.obj.timeDuration = this.TimeDuration;
		//  this.router.navigate(['dashboard/app-bookings'])
		this.userBookingArray.push(this.obj);


		this.getCurrentBooking(this.date, this.TimeDuration);
	}

	getCurrentBooking(date, timeDuration) {


		this.fetchBooking = this.db.list('parking-plaza/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.fetchBooking
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					// this.fetchBooking = this.db.list('parking-plaza/' + this.afAuth.auth.currentUser.uid + snapshot.key);
					// this.fetchBooking.set({name : 'tahir'})
					    
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

		this.fetchBookingForCancel = this.db.list('parking-plaza/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
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
		setTimeout(() => {
			
			this.router.navigate(['dashboard'])
		}, 1000)
	}


	// fetchAllUsers() {
	// 	//fetch all users
	// 	this.fetchDataOfParkingPlaza = this.db.list('parking-plaza', { preserveSnapshot: true });
	// 	this.fetchDataOfParkingPlaza
	// 		.subscribe(snapshots => {
	// this.selectedDateArray = [];
	// snapshots.forEach(snapshot => {
	// user uid
	// console.log(snapshot.key)
	// this.userUid = snapshot.key;
	// console.log(snapshot.val())

	// snapshot.forEach(snapshot => {

	// 	console.log(snapshot.key)
	// 	console.log(snapshot.val());
	// 					this.selectedDate = snapshot.val().selectedDate;
	// 					this.timeDuration = snapshot.val().timeDuration;
	// 					console.log(this.selectedDate);
	// 					this.selectedDateArray.push(this.selectedDate, this.timeDuration);
	// 					console.log(this.selectedDateArray);



	// 				});

	// 			});
	// 		});
	// 		this.fetchCurrentUser();
	// }

	// fetchCurrentUser() {
	// 	console.log('hello 2nd function!');

	//   fetch current user
	// this.currentUserKey = localStorage.getItem('firebaseToken');
	// console.log(this.currentUserKey);
	//  console.log('hello 2nd function!');

	// this.currentUserOfParkingPlaza = this.db.object('parking-plaza' + "/" + this.currentUserKey, { preserveSnapshot: true });
	// this.currentUserOfParkingPlaza
	// 	.subscribe(snapshots => {

	// 		snapshots.forEach(snapshot => {
	// 			// this.selectedDateArray = [];
	// 			console.log(snapshot.key);
	// 			this.currentUserSelectedDate = snapshot.val().selectedDate;
	// 			this.currentUserTimeDuration = snapshot.val().timeDuration;
	// 			console.log(this.selectedDate);
	// 			console.log(this.selectedDateArray);
	// 			this.selectedDateArray.forEach((data) => {

	// console.log(data);
	// this.allUsersTimeAndDate = data;
	// console.log(this.currentUserSelectedDate);

	// for (let i = 0; i < this.selectedDateArray.length; i++) {
	// 	if (this.selectedDateArray[i] == this.currentUserSelectedDate) {
	// 		console.log('on right way  1!');
	// 		if (this.selectedDateArray[i + 1] == this.currentUserTimeDuration) {
	// 			console.log(this.selectedDateArray[i + 1]);

	// 			if (snapshot.val().slot) {
	// 				console.log(snapshot.val().slot);

	// 				this.slot = snapshot.val().slot;

	//for (let i = 0; i < this.buttons.length; i++) {
	// this.buttons[this.slot - 1].reserved = true;
	//}
	// this.buttons[this.slot]
	// 									console.log('demo');
	// 									this.allSlots = true;

	// 								}
	// 							}
	// 						}
	// 					}
	// 				})
	// 			});
	// 		})
	// }
	// slots(slotNumber) {
	// 	console.log(slotNumber);



	// this.selectedDate = parseInt(this.demoForm.value.dateOptions)
	// console.log(this.selectedDate);

	// this.timeOption = parseInt(this.demoForm.value.timeOptions);
	// this.reservedHours = parseInt(this.demoForm.value.reservedHoursOptions);


	// this.totalBookingHours = this.timeOption + this.reservedHours;

	// this.arr = [];
	// for (let i = this.timeOption; i < this.totalBookingHours; i++) {
	// 	this.inBetweenTime = i + 1;
	// console.log(this.inBetweenTime);

	// 	this.arr.push(this.inBetweenTime)

	// 	console.log(this.arr);

	// }
	// this.endTime = this.arr[this.arr.length - 1]
	// console.log(this.endTime)
	// this.items = this.db.list('parking-plaza' + "/" + this.afAuth.auth.currentUser.uid);
	// this.items.push({
	// 	startTime: this.timeOption, reservedHours: this.reservedHours + ' hours',
	// 	inBetweenTime: this.arr + ' hours', slot: slotNumber,
	// 	selectedDate: this.selectedDate, slotBook: false,
	// 	endTime: this.endTime, timeDuration: this.timeOption + ' to ' + this.endTime
	// })
	//    this.selectedDateArray = [];
	// }
	// submit() {
	// this.ngOnInit()
	// this.fetchAllUsers();



	// }


	signOut() {
		this.authService.signOut();
	}

}










