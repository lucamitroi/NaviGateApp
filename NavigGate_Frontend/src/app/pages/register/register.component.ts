import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent {
  constructor(private registerService: RegisterService, private router: Router) {}
  errorMessage = signal('');
  isLoading = signal(false);

  // Function that is called when the form submit button is pressed. It is used to get the response from the backend based on the
  // input from the user. If the response is correct, the new user will be added in the database. If the input is wrong
  // the backend will return an error and that error will be displayed in the frontend
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      this.registerService.sendPostRequest(form.value).subscribe({
        next: (res) => {
          this.errorMessage.set('');
          this.isLoading.set(false);
          alert("Account created succesfully!");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'An error occurred');
          this.isLoading.set(false);
        }
      });
    }
  }

}
