import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardGuard implements CanActivate {
	constructor(private afAuth: AngularFireAuth, private router: Router) { }


	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | boolean {
			return this.afAuth.authState.map(authState => {
      if (!authState || authState.email != 'admin@admin.com') this.router.navigate(['dashboard']);
      return authState != null;
    });

		// return this.afAuth.authState
		// 	.take(1)
		// 	.map(user => !!user)
			
			
		// 	.do(loggedIn => {
		// 		// if (loggedIn){
		// 		// 	this.router.navigate(['/dashboard'])
		// 		// }
		// 		 if (!loggedIn) {

		// 			 console.log(loggedIn)
		// 			console.log('access denied')
		// 			this.router.navigate(['/app-login']);
		// 		}
				// else { 
				// 	this.router.navigate(['/dashboard'])
				// }

			// })

	}
}