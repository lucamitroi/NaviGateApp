import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShipModalComponent } from './delete-ship-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs'

describe('DeleteModalComponent', () => {
  let component: DeleteShipModalComponent;
  let fixture: ComponentFixture<DeleteShipModalComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [DeleteShipModalComponent, HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
