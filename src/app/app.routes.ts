import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DemoComponent } from './demo/demo.component'
import { SignupComponent } from  "./signup/signup.component";
import { LoginComponent } from  "./login/login.component";
import { AuthGuardGuard } from "./providers/auth-guard.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ParkingPlazaComponent } from './parking-plaza/parking-plaza.component';
import { ChargedParkingComponent } from './charged-parking/charged-parking.component';
import { CanttStationParkingComponent } from './cantt-station-parking/cantt-station-parking.component';
import { RootDashboardComponent } from './root-dashboard/root-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { TableFilteringExample } from './tables/tables.component';
const routing : Routes = [
    {path : '' , component : LoginComponent},
    {path : 'app-login' , component : LoginComponent},
    {path : 'app-signup' , component : SignupComponent},
   
    {path : 'dashboard' , component : RootDashboardComponent , canActivate : [AuthGuardGuard],
    children : [
        {path : '', component : DashboardComponent},
         {path : 'demo' , component : DemoComponent  },
         {path : 'parking-plaza' , component : ParkingPlazaComponent},
         {path : 'charged-parking' , component : ChargedParkingComponent},
         {path : 'cantt-station-parking' , component : CanttStationParkingComponent},
		 {path : 'app-bookings' , component : BookingsComponent},
			  {path: 'app-tables' , component : TableFilteringExample}
		]
}
]
export const AppRoutes : ModuleWithProviders = RouterModule.forRoot(routing)
export default AppRoutes;