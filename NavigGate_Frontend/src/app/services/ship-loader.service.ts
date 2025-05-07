import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Ship, ShipToPost } from '../model/data.type';
import { environment } from '../../../environment';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipLoaderService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
  storedShips = signal<Ship[]>([]);
  allShipsList$?: Observable<Ship[]>;

  // Function used to get all the ship info from a user based on the userId decoded in the token
  getUserShipsRequest(userId: number, shipId: number = 0) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let url = `${environment.apiUrl}/Ship/GetShips/${userId}`;
    if(shipId != 0) {
      url += `/${shipId}`;
    }
    else if (shipId === 0) {
      url += '/0';
    }

    return this.http.get<Ship[]>(url, { headers });
  }

  // Function used to send a post request to add a new Ship in the database
  postShipRequest(ship: ShipToPost) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let url = `${environment.apiUrl}/Ship/AddShip`;

    return this.http.post<Ship[]>(url, ship, { headers });
  }

  // Function used to send a put request to edit a Ship in the database
  putShipRequest(ship: ShipToPost) {
    const url = `${environment.apiUrl}/Ship/EditShip`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(url, ship, { headers });
  }

  // Function used to send a put request to delete a Ship in the database
  deleteShipRequest(shipId: number) {
    const url = `${environment.apiUrl}/Ship/DeleteShip/${shipId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(url, { headers });
  }

  refreshShipListNgRx() {
    this.allShipsList$ = this.store.select('listOfAllShips');
    this.allShipsList$.subscribe({
      next: (shipList) => {
        this.storedShips.set(shipList);
      },
      error: (err) => {
        console.error('Error fetching shipIdValue from store:', err);
      }
    });
    return this.storedShips();
  }
}
