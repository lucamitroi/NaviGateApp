import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModalComponent } from './add-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { VoyageActionsService } from '../../services/voayge-actions.service';
import { ShipLoaderService } from '../../services/ship-loader.service';
import { LoginService } from '../../services/login.service';
import { throwError } from 'rxjs';

describe('AddModalComponent', () => {
  let component: AddModalComponent;
  let fixture: ComponentFixture<AddModalComponent>;
  let mockVoyageActionsService: jasmine.SpyObj<VoyageActionsService>;
  let mockShipLoaderService: jasmine.SpyObj<ShipLoaderService>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockVoyageActionsService = jasmine.createSpyObj('VoyageActionsService', ['sendPostRequest']);
    mockShipLoaderService = jasmine.createSpyObj('ShipLoaderService', ['getUserShipsRequest', 'refreshShipListNgRx']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['decodeJWT']);
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of('mockScreenValue'));
    mockShipLoaderService.getUserShipsRequest.and.returnValue(of([
      { shipId: 1,
        userId: 1,
        shipName: "testShip",
        maxSpeed: 100,
        listOfVoyages: [],
        listOfPorts: [],
        listOfCountries: []
     }]));
     
    mockShipLoaderService.refreshShipListNgRx.and.returnValue([
      { shipId: 1,
        userId: 1,
        shipName: "testShip",
        maxSpeed: 100,
        listOfVoyages: [],
        listOfPorts: [],
        listOfCountries: []
     }]);
    mockLoginService.decodeJWT.and.returnValue({ userId: 123 });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddModalComponent],
      providers: [
        { provide: VoyageActionsService, useValue: mockVoyageActionsService },
        { provide: ShipLoaderService, useValue: mockShipLoaderService },
        { provide: LoginService, useValue: mockLoginService },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call services and update state on valid form submission', () => {
    const mockForm = {
      valid: true,
      value: { field1: 'value1', field2: 'value2' }
    } as NgForm;

    mockVoyageActionsService.sendPostRequest.and.returnValue(of({}));
    component.onSubmit(mockForm);

    expect(mockVoyageActionsService.sendPostRequest).toHaveBeenCalledWith({
      ...mockForm.value,
      shipId: component.shipId
    });
    expect(mockLoginService.decodeJWT).toHaveBeenCalledWith(localStorage.getItem('token'));
    expect(mockShipLoaderService.getUserShipsRequest).toHaveBeenCalledWith(123);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({ 
            listOfAllShips: [
            {
              shipId: 1,
              userId: 1,
              shipName: 'testShip',
              maxSpeed: 100,
              listOfVoyages: [],
              listOfPorts: [],
              listOfCountries: []
            }
          ] })
    );

    expect(component.storedShips()).toEqual([
      { shipId: 1,
        userId: 1,
        shipName: "testShip",
        maxSpeed: 100,
        listOfVoyages: [],
        listOfPorts: [],
        listOfCountries: []
       }]);
  });

  it('should handle errors on form submission', () => {
    const mockForm = {
      valid: true,
      value: { field1: 'value1', field2: 'value2' }
    } as NgForm;
  
    const mockError = { error: 'Test error' };
    mockVoyageActionsService.sendPostRequest.and.returnValue(throwError(() => mockError)); 
  
    component.onSubmit(mockForm);
  
    expect(component.errorMessage()).toBe('Test error'); 
    expect(component.isLoading()).toBe(false); 
  });
});