import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../model/data.type';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ShipLoaderService } from '../../services/ship-loader.service';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { setAllShips, setScreen } from '../../state/app.actions';

@Component({
  selector: 'app-add-ship',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ship.component.html',
  styleUrl: './add-ship.component.scss',
  animations: [
    trigger('fadeInFromBottom', [
      transition(':enter', [
        animate('0.5s ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(50px)', offset: 0 }), 
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })    
        ]))
      ])
    ])
  ]
})

export class AddShipComponent {
  constructor(
    private shipLoader: ShipLoaderService, 
    private loginService: LoginService,
    private store: Store<AppState>
  ) {}
  errorMessage = signal('');
  isLoading = signal(false);

  token = localStorage.getItem('token');
  decodedToken: any;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
      this.shipLoader.postShipRequest({...form.value, userId: this.decodedToken.userId}).subscribe({
        next: (res) => {
          this.errorMessage.set('');
          this.isLoading.set(false);

          this.shipLoader.getUserShipsRequest(this.decodedToken.userId).subscribe({
            next: data => {
              this.store.dispatch(setAllShips({ listOfAllShips: data }));
            },
            error: err => console.error('Error:', err)
          });
          
          this.store.dispatch(setScreen({ screen: 'no-ship' }));
          
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'An error occurred');
          this.isLoading.set(false);
        }
      });
    }
  }
}
