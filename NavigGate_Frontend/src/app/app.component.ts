import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'navigate-app';
}
