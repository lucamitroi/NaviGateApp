import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../model/data.type';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('shakeAnimation', [
      transition(':enter', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-5px)', offset: 0.25 }),
          style({ transform: 'translateX(5px)', offset: 0.5 }),
          style({ transform: 'translateX(-5px)', offset: 0.75 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  errorMessage = signal('');
  isLoading = signal(false);

  // Function that is called when the form submit button is pressed. It is used to get the response from the backend based on the
  // input from the user. If the response is correct, it will get a JWT and store it in the local storage. If the input is wrong
  // the backend will return an error and that error will be displayed in the frontend
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      this.loginService.sendPostRequest(form.value).subscribe({
        next: (res) => {
          this.errorMessage.set('');
          
          // Store the token in the local storage to keep the user authenticated
          const loginResponse = res as LoginResponse;
          const token = loginResponse.token;
          localStorage.setItem('token', token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);
          localStorage.setItem('expiration', expiration.toISOString());
          
          this.router.navigate(['/dashboard']);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'An error occurred');
          this.isLoading.set(false);
        }
      });
    }
  }

}