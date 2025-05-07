import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
       'eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.' +
       'signaturePlaceholder'; 
      }
      return null;
    });
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
