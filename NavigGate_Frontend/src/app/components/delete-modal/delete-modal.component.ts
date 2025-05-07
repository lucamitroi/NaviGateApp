import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Port, Ship, Voyage } from '../../model/data.type';
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
import { setAllShips } from '../..//state/app.actions';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
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

export class DeleteModalComponent {
  
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
  @Input() data: Voyage = {
    voyageId: 0,
    voyageDate: new Date,
    voyageDeparturePort: '',
    voyageDeparturePortId: 0,
    voyageArrivalPort: '',
    voyageArrivalPortId: 0,
    voyageStart: new Date,
    voyageEnd: new Date
  };


  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  // Function used to delete a selected voyage
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      this.voyageAction.sendDeleteRequest(this.data.voyageId).subscribe({
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
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'An error occurred');
          this.isLoading.set(false);
        }
      })
    }
  }
}
