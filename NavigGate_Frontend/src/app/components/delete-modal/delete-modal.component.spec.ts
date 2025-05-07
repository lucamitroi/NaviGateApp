import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponent } from './delete-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent, HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
