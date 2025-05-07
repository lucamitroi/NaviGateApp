import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { UserRegister } from '../model/data.type';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}
  
  sendPostRequest(data: UserRegister) {
    const url = `${environment.apiUrl}/Auth/Register`;
    return this.http.post(url, data);
  }
}