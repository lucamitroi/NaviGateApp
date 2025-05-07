import { TestBed } from '@angular/core/testing';
import { ShipLoaderService } from './ship-loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('ShipLoaderService', () => {
  let service: ShipLoaderService;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    // Create a mock Store
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShipLoaderService,
        { provide: Store, useValue: mockStore }
      ]
    });
    service = TestBed.inject(ShipLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});