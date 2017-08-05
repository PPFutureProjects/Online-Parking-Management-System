import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DemoComponent } from './demo/demo.component'
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardGuard } from "./providers/auth-guard.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ParkingPlazaComponent } from './parking-plaza/parking-plaza.component';
import { ChargedParkingComponent } from './charged-parking/charged-parking.component';
import { CanttStationParkingComponent } from './cantt-station-parking/cantt-station-parking.component';
import { RootDashboardComponent } from './root-dashboard/root-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { TableFilteringExample } from './tables/tables.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { RootAdminComponent } from './root-admin/root-admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';


const routing: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'app-login', component: LoginComponent },
	{ path: 'app-signup', component: SignupComponent },

	{
		path: 'dashboard', component: RootDashboardComponent, canActivate: [AuthGuardGuard],
		children: [
			{ path: '', component: DashboardComponent },
			{ path: 'demo', component: DemoComponent },
			{ path: 'parking-plaza', component: ParkingPlazaComponent },
			{ path: 'charged-parking', component: ChargedParkingComponent },
			{ path: 'cantt-station-parking', component: CanttStationParkingComponent },
			{ path: 'app-bookings', component: BookingsComponent },
			{ path: 'app-my-bookings', component: MyBookingsComponent },
			{ path: 'app-tables', component: TableFilteringExample },
			{path : 'app-feedback' , component : FeedbackComponent}
		]

	},
	{
		path: 'admin', component: RootAdminComponent,
		children: [
			{ path: '', component: AdminComponent },
			{ path: 'app-all-users', component: AllUsersComponent },
			{path : 'app-admin-feedback' , component: AdminFeedbackComponent}
		]
	}
]
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routing)
export default AppRoutes;