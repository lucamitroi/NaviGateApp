import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { ShipInfoComponent } from '../ship-info/ship-info.component';
import { AddShipComponent } from '../add-ship/add-ship.component';

@Component({
  selector: 'app-display',
  imports: [CommonModule, ShipInfoComponent, AddShipComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
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
export class DisplayComponent {
  screenValueSignal = signal('');
  addShipBoolSignal = signal(false);
  constructor(private store: Store<AppState>) {};

  screenValue$?: Observable<string>;
  addShipBool$?: Observable<boolean>;

  ngOnInit(): void {
    this.screenValue$ = this.store.select('screenValue');
    this.screenValue$.subscribe({
      next: (screenValue) => {
        this.screenValueSignal.set(screenValue);
      },
      error: (err) => {
        console.error('Error fetching shipIdValue from store:', err);
      }
    });
  }
}
