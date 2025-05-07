import { Component, signal } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ShipLoaderService } from '../../services/ship-loader.service';
import { LoginService } from '../../services/login.service';
import { Ship } from '../../model/data.type';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { setAllShips, setScreen, showMobileMenu } from '../../state/app.actions';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInFromLeft', [
      transition(':enter', [
        animate('0.5s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(-50px)', offset: 0 }), 
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 })    
        ]))
     ]),
     transition(':leave', [
      animate('0.5s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateX(50px)', offset: 0 }), 
        style({ opacity: 1, transform: 'translateX(0)', offset: 1 })    
      ]))
   ]),
    ])
  ]
})
export class SidebarComponent {
  
  constructor(
    private shipLoader: ShipLoaderService, 
    private loginService: LoginService,
    private store: Store<AppState>
  ) {}

  shipIdValue$?: Observable<string>;
  token = localStorage.getItem('token');
  decodedToken: any;
  storedShips = signal<Ship[]>([]);
  allShipsList$?: Observable<Ship[]>;
  
  handleShipSelection(shipId: number) {
    this.store.dispatch(setScreen({ screen:shipId.toString() }));
    this.store.dispatch(showMobileMenu());
  }

  handleAddShipClick() {
    this.store.dispatch(setScreen({ screen: 'add-ship' }));
    this.store.dispatch(showMobileMenu());
  }

  ngOnInit(): void {
    this.shipIdValue$ = this.store.select('screenValue');
    this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
    this.shipLoader.getUserShipsRequest(this.decodedToken.userId).subscribe({
      next: data => {
        this.store.dispatch(setAllShips({ listOfAllShips: data }));
      },
      error: err => console.error('Error:', err)
    });
    
    this.allShipsList$ = this.store.select('listOfAllShips');
    this.allShipsList$.subscribe({
      next: (shipList) => {
        this.storedShips.set(shipList);
      },
      error: (err) => {
        console.error('Error fetching shipIdValue from store:', err);
      }
    });
  }
}
