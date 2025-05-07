import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DisplayComponent } from '../../components/display/display.component';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SidebarComponent, DisplayComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isMobile = false;
  showMenuBoolean$?: Observable<boolean>;
  constructor(
    private store: Store<AppState>, 
    private breakpointObserver: BreakpointObserver
  ){}
  menuBooleanSignal = signal(false);
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 1000px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    this.showMenuBoolean$ = this.store.select('showMenu');
    this.showMenuBoolean$.subscribe({
      next: (menuBoolean) => {
        this.menuBooleanSignal.set(menuBoolean);
      },
      error: (err) => {
        console.error('Error fetching shipIdValue from store:', err);
      }
    });
  }
}
