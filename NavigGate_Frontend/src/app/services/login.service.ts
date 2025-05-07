import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { UserLogin } from '../model/data.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}
  
  sendPostRequest(data: UserLogin) {
    const url = `${environment.apiUrl}/Auth/Login`;
    return this.http.post(url, data);
  }

  getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = storedExpirationDate ? new Date(storedExpirationDate) : new Date();
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }

  getAuthToken() {
    const token = localStorage.getItem('token');
    const tokenDuration = this.getTokenDuration();

    if (!token) {
        return null;
    }

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
  }

  decodeJWT(token: any) {
    const [header, payload, signature] = token.split(".");

    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
}
}