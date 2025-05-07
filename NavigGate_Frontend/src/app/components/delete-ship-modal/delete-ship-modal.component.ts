import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Ship } from '../../model/data.type';
import { FormsModule, NgForm } from '@angular/forms';
import { VoyageActionsService } from '../../services/voayge-actions.service';

import {
  trigger,
  transition,
  style,
  animate,
  keyframes
} from '@angular/animations';
import { ShipLoaderService } from '../../services/ship-loader.service';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setAllShips, setScreen } from '../../state/app.actions';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-delete-ship-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-ship-modal.component.html',
  styleUrls: ['./delete-ship-modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9) translateY(-20px)' }))
      ])
    ])
  ]
})

export class DeleteShipModalComponent {
  
  constructor(
    private voyageAction: VoyageActionsService,
    private shipLoader: ShipLoaderService, 
    private loginService: LoginService,
    private store: Store<AppState>
  ) { }

  errorMessage = signal('');
  isLoading = signal(false);
  shipIdValue$?: Observable<string>;
  token = localStorage.getItem('token');
  decodedToken: any;
  storedShips = signal<Ship[]>([]);

  @Input() isVisible = false;
  @Input() ship: Ship = {
    shipId: 0,
    userId: 0,
    shipName: '',
    maxSpeed: 0,
    listOfVoyages: [],
    listOfPorts: [],
    listOfCountries: []
  };


  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  // Function used to delete a selected ship 
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      this.shipLoader.deleteShipRequest(this.ship.shipId).subscribe({
        next: (res) => {
          this.errorMessage.set('');
          this.isLoading.set(false);
          this.shipIdValue$ = this.store.select('screenValue');
          this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
          this.shipLoader.getUserShipsRequest(this.decodedToken.userId).subscribe({
                next: data => {
                  this.store.dispatch(setAllShips({ listOfAllShips: data }));
                },
                error: err => console.error('Error:', err)
              });
          
          this.storedShips.set(this.shipLoader.refreshShipListNgRx())
          this.onClose();
          this.store.dispatch(setScreen({ screen: 'no-ship' }));
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'An error occurred');
          this.isLoading.set(false);
        }
      })
    }
  }
}
