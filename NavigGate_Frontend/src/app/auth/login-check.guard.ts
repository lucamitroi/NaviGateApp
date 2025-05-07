import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Guard created to prevent the naviagation to the /dashboard route in case the user is not loged in
export class LoginCheckGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true;
  }
}