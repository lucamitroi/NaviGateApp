import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setScreen, showMobileMenu } from '../../state/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showMenuBoolean$?: Observable<boolean>;
  constructor(
    private loginService: LoginService, 
    private route: Router,
    private store: Store<AppState>
  ) {}
  decodedToken: any;
  userName = signal('');

  handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.route.navigate(['/login']);
    this.store.dispatch(setScreen({ screen: 'no-ship' }));
  }

  handleMenuClick() {
    this.store.dispatch(showMobileMenu());
  }

  ngOnInit() {
    this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
    this.userName.set(this.decodedToken.firstName);
  }

}
