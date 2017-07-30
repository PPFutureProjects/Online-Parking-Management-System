import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";
@Component({
  selector: 'dashboard',
  templateUrl: './root-dashboard.component.html',
  styleUrls: ['./root-dashboard.component.css']
})
export class RootDashboardComponent implements OnInit {

 
  constructor(private authService: AuthService) { 
    
  }
   
  ngOnInit() {
  }

signOut(){
this.authService.signOut();
}
}
