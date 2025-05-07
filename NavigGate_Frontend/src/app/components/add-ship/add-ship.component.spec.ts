import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipComponent } from './add-ship.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AddShipComponent', () => {
  let component: AddShipComponent;
  let fixture: ComponentFixture<AddShipComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [AddShipComponent, CommonModule, HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore },
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
