import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../providers/auth.service";
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private authService :AuthService) { }

  ngOnInit() {
  }

  signOut() {
		this.authService.signOut();
	}

}
