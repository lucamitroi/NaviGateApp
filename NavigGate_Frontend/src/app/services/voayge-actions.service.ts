import { Injectable } from '@angular/core';
import { Voyage } from '../model/data.type';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoyageActionsService {

  constructor(private http: HttpClient) { }

  // Function used to send a put request to edit a Voyage in the database
  sendPostRequest(data: Voyage) {
    const url = `${environment.apiUrl}/Voyage/AddVoyage`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, data, { headers });
}

  // Function used to send a put request to edit a Voyage in the database
  sendPutRequest(data: Voyage) {
      const url = `${environment.apiUrl}/Voyage/EditVoyage`;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.put(url, data, { headers });
  }

  // Function used to send a put request to delete a Voyage in the database
  sendDeleteRequest(voyageId: number) {
    const url = `${environment.apiUrl}/Voyage/DeleteVoyage/${voyageId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(url, { headers });
  }
}
