import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from "../providers/auth.service";

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  demoForm: FormGroup;
  selectedDate;
  timeOption;
  reservedHours;
  totalBookingHours;
  inBetweenTime;
  endTime;
  isSlot1 = true;
  arr = [];

  items: FirebaseListObservable<any>;


  dates = [
    { value: "270717", viewValue: '27-07-17' },
    { value: '280717', viewValue: '28/07/17' },
    { value: '290717', viewValue: '29/07/17' },
    { value: '300717', viewValue: '30/07/17' }
  ];

  times = [
    { value: '1-pm', viewValue: '1 pm' },
    { value: '2-pm', viewValue: '2 pm' },
    { value: '3-pm', viewValue: '3 pm' },
    { value: '4-pm', viewValue: '4 pm' },
    { value: '5-pm', viewValue: '5 pm' },
    { value: '6-pm', viewValue: '6 pm' },
    { value: '7-pm', viewValue: '7 pm' }
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


  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.items = this.db.list('/users' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val());
          console.log(snapshot.val().selectedDate);
          
          //  debugger;
          if (snapshot.val().selectedDate == '270717' && snapshot.val().startTime == 1 && snapshot.val().endTime == 4 && snapshot.val().inBetweenTime == '2,3,4 hours' && snapshot.val().slot == 1) {
          // console.log(snapshot.val());
          console.log('asdasd');
          // this.isSlot1 = false;
          
          

          }
        });
      })

    this.demoForm = this.fb.group({
      timeOptions: '',
      reservedHoursOptions: '',
      dateOptions: ''
    })
  }

  slots(slotNumber,t) {
    console.log(slotNumber);
    console.log(t)
    

    this.selectedDate = parseInt(this.demoForm.value.dateOptions)
    console.log(this.selectedDate);

    this.timeOption = parseInt(this.demoForm.value.timeOptions);
    this.reservedHours = parseInt(this.demoForm.value.reservedHoursOptions);


    this.totalBookingHours = this.timeOption + this.reservedHours;

    this.arr = [];
    for (let i = this.timeOption; i < this.totalBookingHours; i++) {
      this.inBetweenTime = i + 1;
      // console.log(this.inBetweenTime);

      this.arr.push(this.inBetweenTime)

      console.log(this.arr);

    }
    this.endTime = this.arr[this.arr.length - 1]
    console.log(this.endTime)
    this.items = this.db.list('users' + "/" + this.afAuth.auth.currentUser.uid);
    this.items.push({
      startTime: this.timeOption, reservedHours: this.reservedHours + ' hours',
      inBetweenTime: this.arr + ' hours', slot: slotNumber, 
      selectedDate: this.selectedDate,slotBook : false,
      endTime: this.endTime, timeDuration: this.timeOption + ' to ' + this.endTime
    })

  }
  submit() { }


signOut(){
this.authService.signOut();
}

}
