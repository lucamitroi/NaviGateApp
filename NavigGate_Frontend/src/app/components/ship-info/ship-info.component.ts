import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoginService } from '../../services/login.service';
import { Port, Ship, Voyage } from '../../model/data.type';
import { FormsModule, NgForm } from '@angular/forms';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ModalComponent } from '../edit-modal/modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { VisualGraphComponent } from '../visual-graph/visual-graph.component';
import { ShipLoaderService } from '../../services/ship-loader.service';
import { setAllShips } from '../../state/app.actions';
import { DeleteShipModalComponent } from '../delete-ship-modal/delete-ship-modal.component';

@Component({
  selector: 'app-ship-info',
  imports: [
    CommonModule, 
    ModalComponent, 
    DeleteModalComponent, 
    AddModalComponent, 
    VisualGraphComponent,
    FormsModule,
    DeleteShipModalComponent
  ],
  templateUrl: './ship-info.component.html',
  styleUrl: './ship-info.component.scss',
  animations: [
    trigger('fadeInFromBottom', [
      transition(':enter', [
        animate('0.5s ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(50px)', offset: 0 }), 
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })    
        ]))
      ]),
    ]),
    trigger('fadeInDetails', [
      transition(':enter', [
        animate('0.2s ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }), 
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })    
        ]))
      ]),
      transition(':leave', [
        animate('0.2s ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }), 
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 })    
        ]))
      ])
    ]),
  ]
})


export class ShipInfoComponent {
  
  constructor(
    private store: Store<AppState>,
    private loginService: LoginService,
    private shipLoader: ShipLoaderService
  ) {}

  formatDate(date: any): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const validDate = date instanceof Date ? date : new Date(date);
    if (isNaN(validDate.getTime())) {
      return 'Invalid Date';
    }
  
    const mm = pad(validDate.getMonth() + 1);
    const dd = pad(validDate.getDate());
    const yy = pad(validDate.getFullYear() % 100);
    const hh = pad(validDate.getHours());
    const min = pad(validDate.getMinutes());
  
    return `${mm}/${dd}/${yy} ${hh}:${min}`;
  }

  userIdSignal = signal(0);
  showVoyages = signal(true);
  showPorts = signal(true);
  showCountries = signal(true);
  showModal = signal(false);
  showDeleteModal = signal(false);
  showAddModal = signal(false);
  showDeleteShipModal = signal(false);
  storedShip = signal<Ship | null>(null);
  editButton = signal(true);
  isLoading = signal(false);

  decodedToken: any;
  selectedItem = signal<Voyage>({
    voyageId: 0,
    voyageDate: new Date,
    voyageDeparturePort: '',
    voyageDeparturePortId: 0,
    voyageArrivalPort: '',
    voyageArrivalPortId: 0,
    voyageStart: new Date,
    voyageEnd: new Date
  });

  selectedDeparturePort = signal<Port>({
    portId: 0,
    portName: '',
    portCountry: ''
  })

  selectedArrivalPort = signal<Port>({
    portId: 0,
    portName: '',
    portCountry: ''
  })

  shipNameMutable: string | undefined = '';
  shipSpeedMutable: number | undefined = 0;


  handleHideVoyages() {
    this.showVoyages.set(!this.showVoyages())
  }

  handleHidePorts() {
    this.showPorts.set(!this.showPorts())
  }

  handleHideCountries() {
    this.showCountries.set(!this.showCountries())
  }

  handleEditButton() {
    this.editButton.set(!this.editButton());
  }


  openModal(item: Voyage, departurePort: Port, arrivalPort: Port) {
    this.selectedItem.set(item);
    this.selectedDeparturePort.set(departurePort);
    this.selectedArrivalPort.set(arrivalPort);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  openDeleteModal(item: Voyage) {
    this.selectedItem.set(item);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  openAddModal() {
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  openDeleteShipModal() {
    this.showDeleteShipModal.set(true);
  }

  closeDeleteShipModal() {
    this.showDeleteShipModal.set(false);
  }

  getPortById(portId: number): any  {
    return this.storedShip()?.listOfPorts.find(port => port.portId === portId);
  }

  ngOnInit(): void {
    this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
    this.store.select('screenValue').subscribe({
      next: (shipId) => {
        this.store.select('listOfAllShips').subscribe({
          next: (data) => {
            this.userIdSignal.set(Number(shipId));
            this.storedShip.set(data.find(ship => ship.shipId === Number(shipId)) || null);
            this.shipNameMutable = this.storedShip()?.shipName;
            this.shipSpeedMutable = this.storedShip()?.maxSpeed;
          },
          error: (err) => {
            console.error('Error fetching ships:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching shipId from store:', err);
      }
    });
  }

  onSubmit(form: NgForm) {
      if (form.valid) {
        this.isLoading.set(true);
        this.shipLoader.putShipRequest(
          {...form.value, 
            shipId: this.storedShip()?.shipId
          }).subscribe({
          next: (res) => {
            this.isLoading.set(false);
            this.decodedToken = this.loginService.decodeJWT(localStorage.getItem('token'));
            this.shipLoader.getUserShipsRequest(this.decodedToken.userId).subscribe({
              next: data => {
                this.store.dispatch(setAllShips({ listOfAllShips: data }));
              },
              error: err => console.error('Error:', err)
            });
            
            this.handleEditButton();
            this.isLoading.set(false);
          },
          error: (err) => {
            this.isLoading.set(false);
          }
        })
      }
    }
}
