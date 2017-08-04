import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  usersArray: any[] = [];

  selectedOption: string;

  fetchAllUsers: FirebaseListObservable<any>;
  constructor(public dialog: MdDialog,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService) { }


  ngOnInit() {
    this.showAllUsers();
  }

  usersObject = {
    userUid: '',
    userName: '',
    userLastName: '',
    userEmail: '',
    userTelephone: '',
    userCNIC: '',
    userAddress: ''
  }
  showAllUsers() {
    this.fetchAllUsers = this.db.list('/users', { preserveSnapshot: true });
    this.fetchAllUsers
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.usersObject = {
            userUid: '',
            userName: '',
            userLastName: '',
            userEmail: '',
            userTelephone: '',
            userCNIC: '',
            userAddress: ''
          }
          console.log(snapshot.key)
          console.log(snapshot.val());

          this.usersObject.userUid = snapshot.key;
          this.usersObject.userName = snapshot.val().userName;
          this.usersObject.userLastName = snapshot.val().userLastName;
          this.usersObject.userEmail = snapshot.val().userEmail;
          this.usersObject.userTelephone = snapshot.val().userTelephone;
          this.usersObject.userCNIC = snapshot.val().userCNIC;
          this.usersObject.userAddress = snapshot.val().userAddress;

          this.usersArray.push(this.usersObject)
          console.log(this.usersArray);


        });
      })
  }
  
  signOut() {
    this.authService.signOut()
    
  }

  openDialog(uid) {
    console.log(uid);

    
    // let dialogRef2 = this.dialog.open(DialogResultExampleDialog, {
    //   data : 'demo'   
    // });

    let dialogRef = this.dialog.open(DialogResultExampleDialog,{
        data: this.usersArray,
       
    });
    
// dialogRef.componentInstance.name= url;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }



}

import { Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'dialog-result-example-dialog',
  template: `
  <ul>
   <li *ngFor="let a of data">{{a.userName}}</li>
  </ul>
  <h1 md-dialog-title>Dialog</h1>
<div md-dialog-content>What would you like to do?</div>
<div md-dialog-actions>
  <button md-button md-dialog-close="Option 1">Option 1</button>
  <button md-button md-dialog-close="Option 2">Option 2</button>
</div>

  
   `,
})
export class DialogResultExampleDialog {
    uid;
    // name: string;
  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<DialogResultExampleDialog>) {
    console.log(data);
  
    
    
    
   }


}
