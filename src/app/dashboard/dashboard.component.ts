import { Component, OnInit } from '@angular/core';

import { AuthService } from "../providers/auth.service";

import { Router } from "@angular/router"
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private authService: AuthService,
		private router: Router) {

	}

	ngOnInit() {
	}

	chargedParking() {
		this.router.navigate(['dashboard/charged-parking'])
	}

	canttStation() {
		this.router.navigate(['dashboard/cantt-station-parking'])
	}

	parkingPlaza() {
		this.router.navigate(['dashboard/parking-plaza'])
	}
	signOut() {
		this.authService.signOut();
	}

}
