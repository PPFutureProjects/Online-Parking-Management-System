import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// components
import { AppComponent } from './app.component';
import { AppRoutes } from "./app.routes";
import { DashboardComponent } from './dashboard/dashboard.component'


// angularFire imports
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//material 2 imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import 'hammerjs';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MdToolbarModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { MdTableModule, } from '@angular/material';
import { CdkTableModule } from "@angular/cdk";
import { MdTabsModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

import { MD_ERROR_GLOBAL_OPTIONS, showOnDirtyErrorStateMatcher } from "@angular/material"

// services
import { AuthService } from "./providers/auth.service";
import { AuthGuardGuard } from "./providers/auth-guard.guard";
import { FeedbackService } from "./providers/feedback.service";

import { ParkingPlazaComponent } from './parking-plaza/parking-plaza.component';
import { ChargedParkingComponent } from './charged-parking/charged-parking.component';
import { CanttStationParkingComponent } from './cantt-station-parking/cantt-station-parking.component';
import { RootDashboardComponent } from './root-dashboard/root-dashboard.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { RootAdminComponent } from './root-admin/root-admin.component';
import { DialogResultExampleDialog } from './all-users/all-users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
// import { ResultDialog  } from './parking-plaza/parking-plaza.component'
@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		DashboardComponent,
		ParkingPlazaComponent,
		ChargedParkingComponent,
		CanttStationParkingComponent,
		RootDashboardComponent,
		MyBookingsComponent,
		AdminComponent,
		AllUsersComponent,
		RootAdminComponent,

		DialogResultExampleDialog,

		FeedbackComponent,

		AdminFeedbackComponent,

		UpdateProfileComponent
	],
	entryComponents: [DialogResultExampleDialog],
	imports: [
		BrowserModule,
		AppRoutes,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MdButtonModule,
		MdCheckboxModule,
		MdSelectModule,
		MdToolbarModule,
		MdListModule,
		MdCardModule,
		MdInputModule,
		MdDatepickerModule,
		MdNativeDateModule,
		MdTableModule,
		CdkTableModule,
		MdTabsModule,
		MdDialogModule






	],
	providers: [AuthService, AuthGuardGuard, FeedbackService, { provide: MD_ERROR_GLOBAL_OPTIONS, useValue: { errorStateMatcher: showOnDirtyErrorStateMatcher } }],
	bootstrap: [AppComponent]
})
export class AppModule { }
