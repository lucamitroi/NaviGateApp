import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Guard created to prevent the naviagation to the /login and /register routes in case the user is already loged in
export class PreventNavigationGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/dashboard']); 
      return false;
    }
    return true;
  }
}