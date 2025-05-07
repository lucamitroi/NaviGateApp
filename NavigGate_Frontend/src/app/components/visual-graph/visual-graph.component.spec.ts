import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualGraphComponent } from './visual-graph.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('VisualGraphComponent', () => {
  let component: VisualGraphComponent;
  let fixture: ComponentFixture<VisualGraphComponent>;
  let mockStore: jasmine.SpyObj<Store>

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [VisualGraphComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
