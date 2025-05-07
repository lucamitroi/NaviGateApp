import { TestBed } from '@angular/core/testing';

import { VoyageActionsService } from './voayge-actions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VoyageActionsService', () => {
  let service: VoyageActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VoyageActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
