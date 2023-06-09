import {Component } from '@angular/core';
import { AuthService } from "../services/auth.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  authenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  logout(){
    this.authService.logoutUser().subscribe(() => {
       this.router.navigate(['/'])
    })
  }
}